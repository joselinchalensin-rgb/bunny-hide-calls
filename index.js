import { patcher, webpack } from "@vendetta";

// Tu ID de canal específico
const TARGET_CHANNEL_ID = "1355988541506847053";

// Tipos de mensajes de Discord relacionados con llamadas
const CALL_MESSAGE_TYPES = [3, 11]; 
// 3: Llamada estándar, 11: Llamada grupal/missed

export default {
  onLoad: () => {
    // Localizamos el módulo que gestiona los mensajes en la memoria de la app
    const MessageStore = webpack.findByProps("getMessages", "getMessage");

    if (MessageStore) {
      patcher.after("getMessages", MessageStore, (args, res) => {
        const channelId = args[0];

        // Solo actuamos si el ID coincide con el tuyo
        if (channelId === TARGET_CHANNEL_ID && res && res._messages) {
          // Filtramos el array de mensajes para eliminar los de tipo llamada
          res._messages = res._messages.filter(
            (msg) => !CALL_MESSAGE_TYPES.includes(msg.type)
          );
        }
      });
    }
  },
  onUnload: () => {
    // Limpiamos el parche al desactivar el plugin para no causar errores
    patcher.unpatchAll();
  }
};
