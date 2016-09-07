export default {
  "name" : "mechanic",
  "dialog": [
    {
      "id": 1,
      "content": "Hey, you there! You look like a fellah with half of a brain or more, you wouldn’t mind helping me with this thing? There’s something odd with the engine, and the ship keeps losing power. At this rate we might not make it all the way.",
      "questions": [
        {
          "content": "Sure, I know everything about spaceships!",
          "next-id": 0
        },
        {
          "content": "Naw, I know nothing of spaceships…",
          "next-id": 0
        }
      ]
    },
    {
      "id": 2,
      "content": "We’ll need to do some troubleshootin’, ‘cause I’ve no clue as to what is causing this. But you’re a technical wiz, I’m sure you’ll solve it. My guess it’s something to do with the wiring though.",
      "questions": [
        {
          "content": "I think the problem might be in your mind",
          "next-id": 0
        },
        {
          "content": "You’re likely right, can I have a look at the wiring?",
          "next-id": 0
        },
        {
          "content": "No, I think it has something to do with the fuel supply",
          "next-id": 0
        }
      ],
      "next-id": 3
    }
  ]
}
