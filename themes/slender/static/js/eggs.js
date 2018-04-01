const now = new Date();

const animate = (agent) => {
    agent.animate();
}

const say = (text, agent) => {
    agent.speak(text);
}

const loadEgg = () => {
    clippy.load('Clippy', function(agent) {
        agent.show();
        setInterval(say, 5000, "So liking this site, huh?", agent)
        setInterval(say, 10000, "You know, I only show once a year?", agent)
        setInterval(say, 20000, "Want to sign my petition to show up at halloween too??", agent)
        setInterval(say, 60000, "I am a GitHub bot now! At least they like me :(")
        setInterval(animate, 30000, agent)
    });
}

if (now.getDate() == 1 && now.getMonth() == 3) {
    loadEgg();
}

