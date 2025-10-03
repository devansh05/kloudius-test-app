#!/bin/bash

# Test runner script for React Native project
# This script provides various test running options

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_colored() {
    printf "${2}${1}${NC}\n"
}

# Function to show help
show_help() {
    echo "React Native Test Runner"
    echo ""
    echo "Usage: ./scripts/test.sh [option]"
    echo ""
    echo "Options:"
    echo "  help          Show this help message"
    echo "  all           Run all tests"
    echo "  watch         Run tests in watch mode"
    echo "  coverage      Run tests with coverage report"
    echo "  components    Run only component tests"
    echo "  screens       Run only screen tests"
    echo "  hooks         Run only hook tests"
    echo "  lint          Run ESLint"
    echo "  format        Check code formatting"
    echo "  ci            Run CI pipeline (lint + format + test + coverage)"
    echo ""
}

# Function to run tests
run_tests() {
    local pattern="$1"
    local description="$2"
    
    print_colored "Running $description..." "$BLUE"
    
    if [ -n "$pattern" ]; then
        npm test -- --testPathPattern="$pattern"
    else
        npm test
    fi
}

# Function to run tests with coverage
run_coverage() {
    print_colored "Running tests with coverage..." "$BLUE"
    npm run test:coverage
    print_colored "Coverage report generated in ./coverage/" "$GREEN"
}

# Function to run CI pipeline
run_ci() {
    print_colored "Running CI pipeline..." "$BLUE"
    
    print_colored "Step 1: Linting..." "$YELLOW"
    npm run lint
    
    print_colored "Step 2: Format check..." "$YELLOW"
    npm run format:check
    
    print_colored "Step 3: Running tests..." "$YELLOW"
    npm test
    
    print_colored "Step 4: Coverage report..." "$YELLOW"
    npm run test:coverage
    
    print_colored "CI pipeline completed successfully!" "$GREEN"
}

# Main script logic
case "${1:-all}" in
    "help")
        show_help
        ;;
    "all")
        run_tests "" "all tests"
        ;;
    "watch")
        print_colored "Starting test watcher..." "$BLUE"
        npm run test:watch
        ;;
    "coverage")
        run_coverage
        ;;
    "components")
        run_tests "components" "component tests"
        ;;
    "screens")
        run_tests "screens" "screen tests"
        ;;
    "hooks")
        run_tests "hooks" "hook tests"
        ;;
    "lint")
        print_colored "Running ESLint..." "$BLUE"
        npm run lint
        ;;
    "format")
        print_colored "Checking code formatting..." "$BLUE"
        npm run format:check
        ;;
    "ci")
        run_ci
        ;;
    *)
        print_colored "Unknown option: $1" "$RED"
        echo ""
        show_help
        exit 1
        ;;
esac