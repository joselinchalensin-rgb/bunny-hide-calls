// Plugin: Ocultar Llamadas v2 (Universal)
const TARGET_ID = "1355988541506847053";

export default {
    onLoad: () => {
        try {
            const { webpack, patcher } = window.vendetta || window.enmity || window.bunny;
            
            // Mensaje de confirmación visual en la app
            console.log("Plugin de Ocultar Llamadas Cargado");

            const MessageStore = webpack.findByProps("getMessages");

            patcher.after("getMessages", MessageStore, (args, res) => {
                if (args[0] === TARGET_ID && res?._messages) {
                    // Filtra tipos 3 (Llamada) y 11 (Llamada Grupal)
                    res._messages = res._messages.filter(m => m.type !== 3 && m.type !== 11);
                }
            });
        } catch (e) {
            console.error("Error al cargar el plugin: ", e);
        }
    },
    onUnload: () => {
        const { patcher } = window.vendetta || window.enmity || window.bunny;
        if (patcher) patcher.unpatchAll();
    }
};
