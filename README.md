## Workflow for Adobe CQ5

### Prepare

* buy the licence for cq5 and get the 'cq.jar'
* require 'java' environment. must 64-bit.
* require 'node' environment.
* 'npm install -g gulp' for CLIs.
* 'npm install' for dev dependencies.

and copy the cq.jar files to the project path

    /.cq
        /author
            cq5-author-p4502.jar
            license.properties
        /publish
            cq5-publish-p4503.jar
            license.properties
        /vlt

then add some configure file (can copy the json from the config_example)

    /misc
        /config
            hosts.json
            projects.json


and all simple CLI.

### CQ Install

'gulp cq -i author'
'gulp cq -i publish'


### CQ VLT