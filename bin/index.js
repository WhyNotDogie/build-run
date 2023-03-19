#!/usr/bin/env node

const cp = require('child_process')
const fs = require('fs')
const kleur = require('kleur')

let args = ""

const unfargs = process.argv.splice(2)

for (let i = 0; i < unfargs.length; i++) {
    args += " "+unfargs[i]+""
}

const brj = JSON.parse(fs.readFileSync('./buildandrun.json', 'utf-8'))

const rex = brj["build"]+args

console.log(">> Executing `"+rex+"`...\n")

const proc = cp.exec(rex)

proc.stdout.setEncoding('utf8');
proc.stdout.on('data', function(data) {
    console.log(data)
});

proc.stderr.setEncoding('utf8');
proc.stderr.on('data', function(data) {
    console.log(kleur.red('Error: '), data)
});

proc.on('close', function(code) {
    console.log("")
    if (code == 0) {
        console.log(kleur.green('Process exited with code ' + kleur.bgGreen().white(code)));
    } else {
        console.log(kleur.red('Process exited with code ' + kleur.bgRed().white(code)));
    }
    process.exit(code)
});