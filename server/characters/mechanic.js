export default {
  "name" : "mechanic",
  "dialog": [
    {
      "id": 1,
      /*
         "content": "Hey, you there! You look like a fellah with half of a brain or more, you wouldn’t mind helping me with this thing? There’s something odd with the engine, and the ship keeps losing power. At this rate we might not make it all the way.",*/
      "content" : "Please help, the engine is losing power and I need to fix it!",
      "questions": [
        {
          "content": "Sure, I know everything about spaceships!",
          "next-id": 2
        },
        {
          "content": "Naw, I know nothing of spaceships…",
          "next-id": 30
        }
      ]
    },
    {
      "id": 2,
      "content": "We’ll need to do some troubleshootin’, ‘cause I’ve no clue as to what is causing this. But you’re a technical wiz, I’m sure you’ll solve it. My guess it’s something to do with the wiring though.",
      "questions": [
        {
          "content": "I think the problem might be in your mind",
          "next-id": 3
        },
        {
          "content": "You’re likely right, can I have a look at the wiring?",
          "next-id": 13
        },
        {
          "content": "No, I think it has something to do with the fuel supply",
          "next-id": 26
        }
      ]
    },
    {
      "id": 3,
      "content": "What do you mean, in my mind? You’re saying I’m imagining things?",
      "questions":
      [
        {
          "content": "Yes, I think you’re going mad. There’s nothing wrong with the engine.",
          "next-id": 4
        },
        {
          "content": "No, that’s not at all what I’m saying. What I mean is that maybe there is something bothering you that I can help you with?",
          "next-id": 5
        },
        {
          "content": "Nevermind… (back)",
          "next-id": 2
        }
      ]
    },
    {
      "id": 4,
      "content": "I’m completely fine. You’re the mad one! Get out of here!",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 5,
      "content": "Huh? Yeah, I need help with this engine to get it back to full power!",
      "questions":
      [
        {
          "content": "Ask the mechanic about life back home",
          "next-id": 6
        },
        {
          "content": "Ask about the mechanic's love life",
          "next-id": 7
        },
        {
          "content": "Ask about the mechanic's parents",
          "next-id": 8
        }
      ]
    },
    {
      "id": 6,
      "content": "I was a mechanic back on earth just as I am now. Except back then I worked more on used automatons than spaceship engines. I don’t see how this has anything to do with the engine though, and you’re not helping me fix it. Could you please just go.",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 7,
      "content": "‘I’m single if that’s what you’re asking’, the mechanic said and winked. ‘Did you want to help me with that?’ You feel yourself blushing, and decide to continue walking past the engine room toward the cafeteria. ‘Hey pretty, I wasn’t trying to scare you off. I’m sure that could help with the engine!’, the mechanic shouted and laughed while you make your way to the cafeteria door.",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 8,
      "content": "My father was a mechanic and my mother was a physicist. Neither of them made it onto the ship…’ The voice of the mechanic trembled slightly. ‘But they both are a part of it. My mother was part of the team that invented the propulsion mechanism of the ship, while my father was a part of the engine design team. I think that is how they met, in a company meeting.",
      "questions":
      [
        {
          "content": "The disappointment of them not being here with you must be crushing?",
          "next-id": 9
        },
        {
          "content": "Your father must have been a great influence on your choice of work then?",
          "next-id": 10
        },
        {
          "content": "You must have looked up to your mother a great deal?",
          "next-id": 11
        }
      ]
    },
    {
      "id": 9,
      "content": "Well, not really. Of course it’s hard at times, but they had made it very clear to me from a young age they would never leave Japan, so I’ve had a long time to adjust to the thought. And it’s not like they did not have the opportunity to full lives, they were both far in their hundreds when they decided to move on’ The mechanic's cold words were in stark contrast their trembling voice and tearing eyes. ‘Thank you for asking though. But now I need to get on working.’ As the mechanic turned their back to you, poking at the engine control panel you could hear the faintest sobs. You decide to leave the engine room and go to the cafeteria.",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 10,
      "content": "‘Well, my father was one of the most decorated mechanics in Fukushima, so I followed in his footsteps. It has not always been easy, but he never did get the opportunity to fly any of ships he helped design. So in that sense yes. But I guess I’ve surpassed him now!’ You can see the proudness in the mechanics eyes. ‘That gives me an idea. I need to check the connections between the propulsion system and the engine. Maybe there’s something wrong there. Thank you, whatever your name was, I think I’ll be able to fix the issue now!’ As you walk toward the cafeteria, you hear screams of joy muffled by the increased rumbling of the engine. ‘Yes, that did it!’",
      "questions": [],
      "end": "good"
    },
    {
      "id": 11,
      "content": "‘Well, my mother was one of the top scientists at the physics department of Tokyo University. The research department she was the head of is the sole reason this spaceship is as fast and reliable as it is. You can see the proudness in the mechanics eyes. ‘That gives me an idea. I need to check the connections between the propulsion system and the engine. Maybe there’s something wrong there. Thank you, whatever your name was, I think I’ll be able to fix the issue now!’ As you walk toward the cafeteria, you hear screams of joy muffled by the increased rumbling of the engine. ‘Yes, that did it!’",
      "questions": [],
      "end": "good"
    },
    {
      "id": 13,
      "content": "There’s a gosh darn lot of those wires in her, which ones would you like to have a look at?",
      "questions":
      [
        {
          "content": "The wires connecting the engine to the engine control panel",
          "next-id": 14
        },
        {
          "content": "The wires that connect the engine to the life support system",
          "next-id": 18
        },
        {
          "content": "The wires that connect to the thrusters",
          "next-id": 22
        }
      ]
    },
    {
      "id": 14,
      "content": "Righty, here’s the wires that connect the engine and the control panel. You see anything funny with those?",
      "questions":
      [
        {
          "content": "The red wire shouldn’t be connected to the blue output",
          "next-id": 15
        },
        {
          "content": "The blue wire should be connected to the red output",
          "next-id": 16
        },
        {
          "content": "All seems well with these wires (back)",
          "next-id": 13
        }
      ]
    },
    {
      "id": 15,
      "content": "The mechanic lifts their hand toward where the red wire is connected. A hand covered in scars and burns – it wouldn’t be the first time it’s got hurt or gotten a shock, if something like that would happen… But it won’t, you checked, this should be it, but you can’t help but worry… ‘Click’ It’s connected. You can see an alert light up on the control panel, and the mechanic rushes to see what it says. ‘Error 0091, unrecognized or unsupported device in Port G.’, the mechanic repeats off the screen.  ‘These errors are a pain, now we need to reboot the control system. Are you sure you know anything about spaceships?’",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 16,
      "content": "The friendly mechanic picks up the blue wire into their hand, and looks at the panel of outputs. He looks at the red one amongst all the colorful outputs, and proceeds to push the wire connector into it. For a fraction of a second your mind is filled with a crippling doubt: Was it really the blue wire? … ‘Well that seems to have done absolutely nothin’, the mechanic exclaims and turns to look at you. ‘Do you actually know anything about spacecraft?’",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 18,
      "content": "Righty, here are the wires from the engine to the life support. Careful, some of these are vital for the supply of oxygen. Anything odd here?",
      "questions":
      [
        {
          "content": "The pink wire should connect the red input and blue output",
          "next-id": 19
        },
        {
          "content": "The blue wire should connect the red input and pink output",
          "next-id": 20
        },
        {
          "content": "We seem to be breathing fine, better not touch anything (back)",
          "next-id": 13
        }
      ]
    },
    {
      "id": 19,
      "content": "The mechanic nods, and goes to the panel of wires. You feel a squeeze in your windpipe as you imagine everyone on the ship suffocating, if you’ve made an error. Uncertainty fills you, was it really the red and the blue one? You hear yourself quietly uttering ‘Don’t do it…’ ‘Click’, ‘Click’ The wire is connected. ‘Did you say something’, the mechanic turns to you and asks. ‘...’ You hear the engine revving up as the mechanic walks over to the control panel. ‘Gosh darnit, seems you were right, the power is up!’ Then a red light comes on in the panel. Then another one, and soon the entire panel is lit, and an emergency horn goes off. ‘Emergency alert: Oxygen level declining. Everyone calmy make way to their personal emergency pods’ ‘Shit, shit, shit, what did you do!?’, the mechanic shouts. You rush over to the connected wire, yank it out of the panel, managing to break a pink and a green one in the process. ‘Emergency alert: Losing pressure’ ‘Emergency alert: Releasing storage’ The mechanic stares at you in rage ‘You’ve doomed us! We are all going to die!’ Panic hits you. You run to the engine room door, but it’s been locked by the emergency system. You’re stuck.",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 20,
      "content": "The mechanic nods and goes to the panel of wires. You feel a squeeze in your windpipe as you imagine everyone on the ship suffocating, if you’ve made an error. Uncertainty fills you, was it really the red and the blue one? You hear yourself quietly uttering ‘Don’t do it…’ ‘Click’, ‘Click’ The wire is connected. ‘Did you say something’, the mechanic turns to you and asks. ‘...’ You hear the engine revving up as the mechanic walks over to the control panel. ‘Gosh darnit, seems you were right, the power is up!’",
      "questions": [],
      "end": "good"
    },
    {
      "id": 22,
      "content": "So you suspect there’s something wrong with the propulsion system? The thruster connector wires are here. Poke around as you like. So, it seems that there is a problem with the motor system? Okay, pusher cable can be found here. As long as you as you like, walk.",
      "questions":
      [
        {
          "content": "The blue wire should be disconnected.",
          "next-id": 23
        },
        {
          "content": "The red wire should be connected.",
          "next-id": 24
        },
        {
          "content": "These wires are all good. (back)",
          "next-id": 13
        }
      ]
    },
    {
      "id": 23,
      "content": "‘Okay, so I’ll take out the blue one. Sure’ You watch as the mechanic proceeds to pull the blue wire out of its socket. ‘Huh. I should’ve thought of that. The cleaning robots went around this floor this morning, and they must’ve left the laboratory protocol on: Disconnect every red wire, connect every blue wire. I’ll connect the red wire as well and we should be back to full power!’",
      "questions": [],
      "end": "good"
    },
    {
      "id": 24,
      "content": "‘Okay, so I’ll plug in the red one. Sure’ You watch as the mechanic proceeds to plug in the red wire into its socket. ‘Huh. I should’ve thought of that. The cleaning robots went around this floor this morning, and they must’ve left the laboratory protocol on: Disconnect every red wire, connect every blue wire. I’ll disconnect the blue wire as well and we should be back to full power!’",
      "questions": [],
      "end": "good"
    },
    {
      "id": 26,
      "content": "Right, the fuel supply control is over here. There’s not many adjustments we can do, but you’re the expert… Right, the fuel supply can be found here. There there is no adjustment of the much we can do, but you is a professional ...",
      "questions":
      [
        {
          "content": "Lower the control rods",
          "next-id": 27
        },
        {
          "content": "Raise the control rods",
          "next-id": 28
        },
        {
          "content": "Everything seems to be in order. (back)",
          "next-id": 2
        }
      ]
    },
    {
      "id": 27,
      "content": "‘Lowering the rods? But that would lead to less power for the engine not more? Whatever you say, you’re the expert here’ The mechanic lowers the control rods via the fuel supply control interface. ‘It’ll take a moment until we see the nuclear reaction slow down’ So we wait. And wait. I am getting anxious and doubt is filling my mind: I know nothing of spaceship engines, nuclear power or power supplies. I’m placing a lot of trust in this fish. Soon the control panel beeps, the mechanic rushing over to see what’s going on. ‘Okay, so we’re down on power even more…’ ‘...but consumption is also down?’ ‘Aha, I see it now, you never meant to get the power back to full, but down to an optimal balance! By conserving power we’ll make it, albeit slower, brilliant!’",
      "questions": [],
      "end": "good"
    },
    {
      "id": 28,
      "content": "‘Raising  the rods to increase the reaction, that should increase power. I’ll get to it’ The mechanic raises the control rods via the fuel supply control interface. ‘It’ll take a moment until we see the nuclear reaction intensify!’ So we wait. And wait. I am getting anxious and doubt is filling my mind: I know nothing of spaceship engines, nuclear power or power supplies. I’m placing a lot of trust in this fish. Soon the control panel beeps, the mechanic rushing over to see what’s going on. ‘Yeah, the power levels are up..!’ ‘...and going higher…’ ‘...and higher…’ Simultaneously there is a warning signal, and the control panel is filled with red warning lights. ‘LOWER THE RODS, NOW!’, the mechanic shouts over the now roaring engine. I run to the power supply control and pull a lever that I think I saw the mechanic push earlier. The alarm blaring does not cease, but the interface shows the control rods descending. Slowly. All too slowly. The engine is roaring and has started to creak at its seams. ‘It’s gonna blow!’, shouts the mechanic. And right at that moment I can hear the sound of an explosion and feel a wave of air throwing me forcefully against the wall of the engine room…",
      "questions": [],
      "end": "bad"
    },
    {
      "id": 30,
      "content": "Shoot. I reckon I’ll just leave it like it is then, we’ll likely make it anyway, even with reduced power.",
      "questions": [],
      "end": "bad"
    }
  ]
}
