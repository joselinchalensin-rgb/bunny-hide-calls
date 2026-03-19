// Plugin para ocultar registros de llamadas en canal específico
const TARGET_ID = "1355988541506847053";

export default {
  onLoad: () => {
    // Intentamos obtener las herramientas de parcheo de Bunny/Vendetta
    const v = window.vendetta || window.enmity || window.bunny;
    if (!v) return console.error("No se detectó el motor de Bunny");

    const { webpack, patcher } = v;
    const MessageStore = webpack.findByProps("getMessages");

    if (MessageStore) {
      patcher.after("getMessages", MessageStore, (args, res) => {
        // Si el canal coincide, filtramos mensajes tipo 3 (Llamada) y 11 (Llamada Grupal)
        if (args[0] === TARGET_ID && res && res._messages) {
          res._messages = res._messages.filter(m => m.type !== 3 && m.type !== 11);
        }
      });
    }
  },
  onUnload: () => {
    const v = window.vendetta || window.enmity || window.bunny;
    if (v && v.patcher) v.patcher.unpatchAll();
  }
};
