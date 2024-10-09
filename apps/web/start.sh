#!/bin/sh

# Iniciar yarn preview en segundo plano
yarn preview &

# Iniciar yarn storybook en primer plano
yarn storybook
