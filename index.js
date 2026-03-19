const TARGET_ID = "1355988541506847053";

const plugin = {
  onLoad: () => {
    // Pyoncord usa 'pyon' o 'vendetta' en la ventana global
    const v = window.pyon || window.vendetta;
    if (!v) return;

    const { webpack, patcher } = v;
    const MessageStore = webpack.findByProps("getMessages");

    if (MessageStore) {
      patcher.after("getMessages", MessageStore, (args, res) => {
        if (args[0] === TARGET_ID && res && res._messages) {
          // Filtramos tipos 3 y 11 (Llamadas)
          res._messages = res._messages.filter(m => m.type !== 3 && m.type !== 11);
        }
      });
    }
  },
  onUnload: () => {
    (window.pyon || window.vendetta)?.patcher?.unpatchAll();
  }
};

export default plugin;
