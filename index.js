//FEAR. A Primal Fear has been summoned!
//&r&d&lQUICK MATHS! &r&7Solve: &r&e19+43&r

const PREFIX = '&b[&cPrimal Fears&b] &r&7'

safeLimit = (text) => {
    // allow 0-9, +, -, x, *, /, (, ), and spaces
    text = text.replaceAll('x', '*')
    return text.replace(/[^0-9\+\-\x\*\/\(\)\ ]/g, '');
}

nextSpawnTime = -1;
delay = 0;

register('tick', () => {
    
});

register("chat", (event) => {
    if (Date.now() < delay) return;

    const message = ChatLib.getChatMessage(event, false);
    if (message.removeFormatting().startsWith("FEAR. A Primal Fear has been summoned!")){
        // popup title
        Client.showTitle("&cPrimal Fear", "&chas been summoned!", 20, 40, 20);
    } else if (message.startsWith('QUICK MATHS! Solve:')){
        const equation = message.removeFormatting().split(":")[1].trim();
        const answer = eval(safeLimit(equation));

        ChatLib.chat(`${PREFIX} answering with ${answer} to ${equation}`);
        setTimeout(() => {
            ChatLib.command(`ac ${answer}`)
        }, Math.random() * 5000 + 1000); // 1-2 seconds
        delay = Date.now() + 10000;
    } else if (message.removeFormatting().startsWith('Click HERE to sign')){
        ChatLib.chat(`${PREFIX} auto-accepting pact`);
        new Message(EventLib.getMessage(event)).getMessageParts().forEach((part) => {
            const value = part.getClickValue();
            if (value.startsWith('/spookysignpaper')){
                setTimeout(() => {
                    ChatLib.command(value.replace("/", ""));
                }, Math.random() * 5000 + 1000); // 1-2 seconds
            }
        });
        delay = Date.now() + 10000;
    } else if (message.removeFormatting().startsWith('[FEAR] Public Speaking Demon: Say something interesting') || message.removeFormatting().startsWith('[FEAR] Public Speaking Demon: Speak')){
        // generate a random string of letters between 0-10 characters
        const randomString = Math.random().toString(36).substring(2, 12);
        ChatLib.chat(`${PREFIX} saying ${randomString}`);
        setTimeout(() => {
            ChatLib.command(`ac ${randomString}`);
        }, Math.random() * 5000 + 1000); // 1-2 seconds
        delay = Date.now() + 10000;
    }
});
