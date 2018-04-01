const now = new Date();

const loadEgg = () => {
    clippy.load('Clippy', function(agent) {
        agent.show();
        setInterval(agent.speak, 5000, "So liking this site, huh?")
        setInterval(agent.speak, 10000, "You know, I only show once a year?")
        setInterval(agent.speak, 20000, "Want to sign my petition to show up at halloween too??")
        setInterval(agent.animate, 30000)
    });
}

if (now.getDate() == 1 && now.getMonth() == 3) {
    loadEgg();
}

