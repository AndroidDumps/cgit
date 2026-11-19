#!/bin/sh
# Build + install the dumps cgit on the dumps server (Ubuntu 22.04).
# Tuned for that host only (-march=native). Run as root from anywhere.
# Deps: apt install build-essential libssl-dev zlib1g-dev
set -eu
cd "$(dirname "$0")/.."
[ -f git/Makefile ] || make get-git
# One invocation: "install" depends on "all", and cgit rebuilds when CFLAGS
# change, so a separate install step without CFLAGS would undo -march=native.
make -j"$(nproc)" install NO_LUA=1 CFLAGS="-O2 -march=native -g" \
	prefix=/opt/cgit CGIT_SCRIPT_PATH=/opt/cgit/cgi \
	CGIT_DATA_PATH=/opt/cgit/share CGIT_CONFIG=/etc/cgitrc
# dumps web assets: highlight.js (11.11.1, BSD-3-Clause), our glue script and
# the <head> include referenced by cgitrc's head-include.
install -d /opt/cgit/share/hljs
install -m 644 dumps/static/hljs/* /opt/cgit/share/hljs/
install -m 644 dumps/static/dumps.js dumps/static/head.html /opt/cgit/share/
# Drop nginx's cached cgit pages so UI changes show up immediately.
rm -rf /var/cache/nginx/cgit/*
