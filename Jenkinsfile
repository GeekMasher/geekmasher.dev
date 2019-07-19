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
            steps {
                sh "npm run deploy"
            }
        }
    }
}