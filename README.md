## Workflow for Adobe CQ5

### Prepare

* buy the licence for cq5 and get the `cq.jar`
* require `node` environment.
* prepare files into `cq-env`

    /cq-env
        cq5-author-p4502.jar
        cq5-publish-p4503.jar
        license.properties
        filevault.tgz
        jre-7u51-macosx-x64.tar.gz


* `npm install -g git://github.com/morlay/cq-cli.git` for CLIs.
* `git clone https://github.com/morlay/cq-workflow`
* `cd cq-workflow`
* `CQ_ENV_PATH=/PATH/TO/cq-env cq init`
* `npm install`
* `grunt`




