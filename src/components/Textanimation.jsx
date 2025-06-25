"use client"
import { TypeAnimation } from 'react-type-animation';

const Textanimation = () => {
    return (
        <TypeAnimation
            sequence={[
                "Hey, ready to bring your ideas to life?",
                1000,
                "Hey, let's design something amazing!",
                1000,
                "Hey, welcome to the world of web magic!",
                1000,
                "Hey, code smarter, not harder!",
                1000,
                "Hey, your journey to React mastery starts here!",
                1000,
                "Hey, unleash your creativity with HTML & CSS!",
                1000,
                "Hey, turn your imagination into reality!",
                1000,
                "Hey, let's build beautiful interfaces together!",
                1000,
                "Hey, time to innovate with JavaScript!",
                1000,
                "Hey, design. Develop. Dominate.",
                1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1.5em', display: 'inline-block' }}
            repeat={Infinity}
        />
    );
};

export default Textanimation; 