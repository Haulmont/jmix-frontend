### Addon installation in example-react-app
 This workflow also could be used for addon update in example-react-app.

* build and pack addon
```bash
npm run prepublishOnly
npm pack -q
```

* example app - install addon package, in example app directory execute (note that version of addon may differ)
```bash
  npm i ../packages/jmix-addon-charts/haulmont-jmix-addon-charts-0.0.1-next.1.tgz --legacy-peer-deps
```

* example app - inject addon package, in example app directory execute
```bash
node ../packages/jmix-front-generator/bin/gen-jmix-front react-typescript:addon --dest src --addonPackageName @haulmont/jmix-addon-charts \
--model ../scripts/model/projectModel-scr-jmix.json
```
