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
        setTimeout(say, 5000, "So liking this site, huh?", agent)
        setTimeout(say, 10000, "You know, I only show once a year?", agent)
        setTimeout(say, 20000, "Want to sign my petition to show up at halloween too??", agent)
        setTimeout(say, 70000, "I am a GitHub bot now! At least they like me :(")
        setInterval(animate, 30000, agent)
    });
}

if (now.getDate() == 1 && now.getMonth() == 3) {
    loadEgg();
}

