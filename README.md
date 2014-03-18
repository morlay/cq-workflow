## Workflow for Adobe CQ5

### Prepare

* buy the licence for cq5 and get the `cq.jar`
* require `java` environment. must 64-bit.
* require `node` environment.
* `npm install -g gulp` for CLIs.
* `npm install` for dev dependencies.

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

* `gulp cq -i author`  `gulp cq --install=author`
* `gulp cq -i publish` `gulp cq --install=publish`


### CQ VLT

all can add `-p PROJECT_NAME` or `--project=PROJECT_NAME` to change the project which be config in projects.json

* `gulp vlt.export -h HOST_NAME` or `gulp vlt.export --host=HOST_NAME`
* `gulp vlt.import -h HOST_NAME` or `gulp vlt.import --host=HOST_NAME`

just copy the content

* `gulp vlt.rcp -i FROM_HOST_NAME -o TO_HOST_NAME `

sync

* `gulp vlt.sync -i` or `gulp vlt.sync --install`
* `gulp vlt.sync -s` or `gulp vlt.sync --status`
* `gulp vlt.sync -r` or `gulp vlt.sync --run`
* `gulp vlt.sync -u` or `gulp vlt.sync --unregister`
