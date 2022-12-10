---
title: Debugging CodeQL Databases using Partial Paths
date: "2022-12-10T14:00:00.000Z"
category: "Static Code Analysis"
banner:
  path: /media/codeql-introduction.png
  caption: "GitHub Security Lab"
  link: https://securitylab.github.com/
tags:
  - Security
  - Static Code Analysis
  - Static Application Security Testing
  - SAST
  - GitHub
  - CodeQL
  - Query Language

---

During my GitHub Personal Development this week, I decided to write this blog post about debugging in CodeQL using a technique called 'partial paths'.
This is a technique that I have used in the past to debug queries and the [CodeQL](http://codeql.github.com/) [dataflow graph](https://en.wikipedia.org/wiki/Data-flow_diagram) so I thought it would be a good idea to write a blog post about it.
Hopefully you find this useful and it helps you debug your own CodeQL databases as a security researcher.


**Assumptions:**

I assume you have a basic understanding of CodeQL and how to write queries.
If you want an introduction to CodeQL, I recommend reading my previous blog post [CodeQL Introduction](/posts/introduction-to-codeql-and-code-scanning).


## What are partial paths?

Partial paths are a way to debug CodeQL databases where you can see all the edges of the dataflow graph from a particular node.
This allows you to see data from any node in the code base to any other nodes along with all of the edges connecting them that you might be interested in.

This is a very useful technique when you are trying to debug a query and you are not sure where the data is coming from or where it is going to.
If you are a security researcher and are trying to find a vulnerability in a piece of code, this can be very useful to see where the data is flowing to and from.

Partial paths can be used in any languages that CodeQL supports, I will be using Python in this blog post as it is the language I am most familiar with.

## How do I use partial paths?

An example of this would be the following code snippet:

```python
import os

def mycheck(y):
    if isinstance(y, str):
        return '"' not in y or "'" not in y
    return False

def foo(x):
    if mycheck(x):
        os.system(f"{x}")
    else:
        print("Error in foo")

i = input("Try Input: ")

my_funcs = [foo]

for func in my_funcs:
    func(i)

```

This code is very simple and it is vulnerable to a command injection vulnerability from a local source of data.
The source is coming from the `input()` function and it is being passed to the `foo()` function which is finally being executed by `os.system()`.

The query that I am going to use to find this vulnerability is [the following in our GitHub Field repo](https://github.com/advanced-security/codeql-queries/blob/main/python/CWE-078/CommandInjectionLocal.ql).
This is because CodeQL by default does not consider `input()` to be a source of user-controllable data as this is a local source of data versus being remotely exploitable.

If we run the code snippet above with some input we can see that the code is vulnerable to command injection:

```bash
$ python3 app.py
Try Input: ls -l /
total 9
drwxrwxr-x  45 root  admin  1440  9 Dec 10:23 Applications
drwxr-xr-x  71 root  wheel  2272  7 Nov 12:56 Library
drwxr-xr-x@ 10 root  wheel   320 18 Oct 13:36 System
drwxr-xr-x   6 root  admin   192  7 Nov 12:55 Users
drwxr-xr-x   3 root  wheel    96  9 Dec 17:33 Volumes
# ...
```

So we can confirm that this is vulnerable to command injection but if we run the CodeQL query against the snippet you won't get any results.

[![but why meme](https://media.tenor.com/KjJTBQ9lftsAAAAC/why-huh.gif#center)](https://media.tenor.com/KjJTBQ9lftsAAAAC/why-huh.gif)

First thing to do is check the sources and sinks are both being detected correctly using the quick evaluation feature in the VSCOde CodeQL Plugin:

*Sources:*

![CodeQL sources](/media/sast/codeql-partial-path/codeql-isSource.png)

*Sinks:*

![CodeQL sinks](/media/sast/codeql-partial-path/codeql-isSink.png)

*Note: I have added `and sink.getScope().inSource()` to both the `isSource()` and `isSink()` predicates, this will now only show sources and sinks in the snippet code*

So, we can see that the sources and sinks are being detected correctly but we are not getting any results.
Why?
This is because the query lost the dataflow from the source to the sink somewhere along the way.


### Partial Paths from Source

Now this is where partial paths comes in, we can use partial paths to see where the dataflow is being lost.
Lets try it out with the first query:

```codeql
/**
 * @name Partial Path Query
 * @kind path-problem
 */

import python
import semmle.python.Concepts
import semmle.python.dataflow.new.DataFlow
import semmle.python.dataflow.new.TaintTracking
import DataFlow::PartialPathGraph
import semmle.python.ApiGraphs
// Make sure this is imported to get the partial paths
import DataFlow::PartialPathGraph

// This is just a copy of the field local sources for `input()` to make it easier
class LocalSource extends DataFlow::Node {
  LocalSource() { this = API::builtin("input").getACall() and this.getScope().inSource() }
}

// Partial Path Graph Config
class PartialPathConfig extends TaintTracking::Configuration {
  PartialPathConfig() { this = "Remote Flows" }

  override predicate isSource(DataFlow::Node source) { source instanceof LocalSource }

  override int explorationLimit() { result = 10 }
}

from PartialPathConfig config, DataFlow::PartialPathNode source, DataFlow::PartialPathNode sink
      // Standard CodeQL queries use `config.hasFlow(source, sink)`
where config.hasPartialFlow(source, sink, _)
select sink.getNode(), source, sink, "Partial Graph $@.", source.getNode(), "user-provided value"
```

*Note: some small inline comments with changes/noteworthy things*

There are two main parts of the query to take note of here.

The first is the importing of `DataFlow::PartialPathGraph` and using `DataFlow::PartialPathNode` nodes for both the source and sink nodes.
The second is the usage of the `hasPartialFlow()` predicate instead of the `hasFlow()` predicate.
They are very small changes but are needed to make partial paths work.

If you run this query you will get the following results:

![Partial Path Results](/media/sast/codeql-partial-path/codeql-pp-results-sources.png)

This shows 2 results, we will be focusing on the result with the longer length of 3 steps.
For each of the steps we can see the dataflow from the source leading to the next step:

```python
input("Try Input: ")    # 1. -> `ControlFlowNode for input()` (source function call)
i                       # 2. -> `GSSA Variable i` (variable assignment)
func(i)                 # 3. -> `ControlFlowNode for i` (variable use in function call `func(i)`)
```

The notable thing here is that the dataflow is lost at the end of the last step as CodeQL doesn't know what `func()` is or what it calls.

If you now look at the AST for the `func()` call you will see that CodeQL knows its a function call but doesn't seem to know where it calls to as its looking for a function with the name `func`

![AST Viewer](/media/sast/codeql-partial-path/codeql-view-ast.png)


### Partial Paths from Sink

So now we have traced from the source to the end of the last step, we can now look at the same but in reverse.
We might want to do it to ask the question "where does the data come from that leads to a sink?".

Thankfully this is very easy to do using the following query:

```codeql
/**
 * @name Partial Path Query
 * @kind path-problem
 */

import python
import semmle.python.dataflow.new.DataFlow
import semmle.python.dataflow.new.TaintTracking
import semmle.python.Concepts
import semmle.python.dataflow.new.RemoteFlowSources
import semmle.python.dataflow.new.BarrierGuards
import DataFlow::PartialPathGraph
import semmle.python.ApiGraphs
// We want this use the sinks from the command injection query
private import semmle.python.security.dataflow.CommandInjectionCustomizations

// Partial Path Graph Config
class PartialPathConfig extends TaintTracking::Configuration {
  PartialPathConfig() { this = "Remote Flows" }

  override predicate isSink(DataFlow::Node sink) {
    sink instanceof CommandInjection::Sink and sink.getScope().inSource()
  }

  override int explorationLimit() { result = 10 }
}

from PartialPathConfig config, DataFlow::PartialPathNode source, DataFlow::PartialPathNode sink
where config.hasPartialFlowRev(source, sink, _)
select sink.getNode(), source, sink, "Partial Graph $@.", source.getNode(), "user-provided value"
```

Lets break down the changes in this query.

The first change is the import of `CommandInjection::Sink` from the `CommandInjectionCustomizations` library.
This is because I know a Command Injection sink exists for this snippet but I don't want to write my own sink.

The second part is that the `override predicate isSource(...)` has been removed and replaced with `override predicate isSink(...)`.
We can then use the `sink instanceof CommandInjection::Sink` to make sure we are only looking for a subset of sinks.
In our case we are only looking for Command Injection sinks.

The last part is the change from `hasPartialFlow()` to `hasPartialFlowRev()`.
This tells CodeQL to traverse the graph in reverse from the sink.

Now if we run the query we get the following results:

![Partial Path Results](/media/sast/codeql-partial-path/codeql-pp-results-sinks.png)

This is giving us 8 results because we are looking for all of the possible nodes that lead to a sink we want to find.
Let's take a look at some of the longer paths:

```python
def foo(x):       # 1. -> ControlFlowNode for x (function definition)
x                 # 2. ->	SSA variable x (variable assignment)
if mycheck(x):    # 3. ->	ControlFlowNode for x (if clause with `mycheck(x)`)
x                 # 4. ->	ControlFlowNode for x (format string usage)
f"{x}"            # 5. ->	ControlFlowNode for Fstring (format string expression)
```

One thing to note is the order of the steps are not reversed and follow the same order as the source to sink path.
This is because the path is being traversed in the direction of the dataflow.

The thing to note with this is we can see `foo(x)` is one of the sources of data and so `foo()` might not ever be called.
In this case it is being called and executed but we are dynamically calling the function at runtime based on the variables in `my_funcs`.


## Tips and Tricks

This part is a collection of tips and tricks I have found to be useful when using partial paths.


### Narrowing Down Sources and Sinks

In our example we used `LocalSource`  and `CommandInjection::Sink` from the `CommandInjectionCustomizations` standard library.
These are great but you might want to narrow the results down even more to a particular node in the codebase.

This makes the query faster and more specific to the problem you are trying to solve.


### Using Remote Flow Sources

This is a tip I found when I was trying to find a specific path from exploitable remote source to a sink.
Using a source path but setting the `isSource()` to select the remote sources CodeQL has found in the codebase.

```codeql
// Imports
import semmle.python.dataflow.new.RemoteFlowSources
// ...
class PartialPathConfig extends TaintTracking::Configuration {
  // ...
  override predicate isSource(DataFlow::Node source) {
    source instanceof RemoteFlowSource
  }
  // ...
}
```


### Using All Vulnerable Sinks

Similar to the above tip but instead of using a specific sink from one QL library, we can use any number of sinks from CodeQL.

This would look something like this:


```codeql
// Sink Imports
private import semmle.python.security.dataflow.CommandInjectionCustomizations
private import semmle.python.security.dataflow.CodeInjectionCustomizations
private import semmle.python.security.dataflow.ServerSideRequestForgeryCustomizations
private import semmle.python.security.dataflow.SqlInjectionCustomizations
private import semmle.python.security.dataflow.UnsafeDeserializationCustomizations

// Partial Path Graph Config
class PartialPathConfig extends TaintTracking::Configuration {
  // Also adding custom sinks
  override predicate isSink(DataFlow::Node sink) {
    sink instanceof CommandInjection::Sink or
    sink instanceof CodeInjection::Sink or
    sink instanceof ServerSideRequestForgery::Sink or
    sink instanceof SqlInjection::Sink or
    sink instanceof UnsafeDeserialization::Sink
  }
  // ...
}
```

This means you can widen the scope of your query to find any of the vulnerable sinks in the codebase.


### Filter by Locations

This is a tip I found when I was trying to find a specific path in a large codebase.
Pinning the source and/or sink to a specific location can help narrow down the results.

You will need a predicate to find the node at a specific location.

```codeql
// Node, relative path (string to path), line number (int)
predicate findByLocation(DataFlow::PartialPathNode node, string relative_path, int linenumber) {
  node.getNode().getLocation().getFile().getRelativePath() = relative_path and
  node.getNode().getLocation().getStartLine() = linenumber
}

// ... 

from RemoteFlows config, DataFlow::PartialPathNode source, DataFlow::PartialPathNode sink
where
  config.hasPartialFlow(source, sink, _) and
  // Pin the source to a specific location
  findByLocation(source, "source/relative/path.py", 10) and
  // Pin the sink to a specific location
  findByLocation(sink, "sink/relativepath.py", 10)
select sink.getNode(), source, sink, "Partial Graph $@.", source.getNode(), "user-provided value"
```

You can pin either the source or sink or both to a specific location.
This can help narrow down the results to a specific part of the codebase.


## Conclusion

Partial paths are a great way to debug and find new paths that lead to and from sources and sinks.
We started with "CodeQL isn't finding this issue" to now knowing why CodeQL isn't finding the issue because of broken dataflow.
This becomes super useful when you are trying to debug CodeQL queries and find paths that lead to sinks that we weren't aware of.

Today we are not going to look at how we can fix this and add additional flow steps to make CodeQL aware of the issue.
If this is something you are interested in please let me know on [Twitter](https://twitter.com/geekmasher) or [Mastodon](https://infosec.exchange/@geekmasher) and I will write a follow up post.
