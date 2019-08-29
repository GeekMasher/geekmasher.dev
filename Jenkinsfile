pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage('Test') {
            steps {
                sh "npm run test"
            }
        }
        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                sh "npm run deploy"
            }
        }
    }
}