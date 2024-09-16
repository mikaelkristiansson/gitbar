#!/usr/bin/env bash
echo "Bumping version to $1"
npm version $1 && cd src-tauri && cargo bump $1 && cd ..
