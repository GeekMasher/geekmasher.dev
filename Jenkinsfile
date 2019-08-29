pipeline {
    agent {
        docker { image 'node:latest' }
    }

    stages {
        stage('Pre-Build') {
            steps {
                sh "npm install"
            }
        }
        stage('Test') {
            parallel {
                stage('Unit tests') {
                    steps {
                        sh "npm run test"
                    }
                }
                // stage('Linting') {
                //     steps {
                //         sh "npm run lint"
                //     }
                // }
            }
        }
        stage('Build') {
            steps {
                sh "npm run build"
            }
        }
        stage('Deploy') {
            parallel {
                stage('Pre-Production') {
                    when {
                        branch 'develop'
                    }
                    steps {
                        sh "now"
                    }
                }
                stage('Production') {
                    when {
                        branch 'master'
                    }
                    steps {
                        sh "npm run deploy"
                    }
                }
            }
        }
    }
}