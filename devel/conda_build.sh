#!/bin/bash

devel/compile.sh
conda build -c conda-forge -c flatiron devel/conda.recipe
