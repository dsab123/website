  const importAll = function(r) {
    let assets = [];
    r.keys().map((item, index) => { 
        assets[item.replace('./', '')] = {hash: r(item).default};
    });
    return assets;
  }
  
  export class AssetContextValueConverter {
      toView(name) {
        const assets = importAll(require.context('../../../static', false, /\.(png|jpe?g|svg)$/));
        return assets[name].hash;
      }
  }