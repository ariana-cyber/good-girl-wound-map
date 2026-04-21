export type QuestionType = 'single' | 'multi' | 'open'

export interface Question {
  id: number
  question: string
  type: QuestionType
  options?: string[]
  followUp: string
  followUpPlaceholder?: string
}

export const questions: Question[] = [
  {
    id: 1,
    question: "When someone is upset with you, your first instinct is to:",
    type: 'single',
    options: [
      "Apologize immediately, even if I'm not sure what I did wrong",
      "Fix it — find a solution so the discomfort ends",
      "Go quiet and wait for it to pass",
      "Shut down completely",
      "Explain myself until they understand"
    ],
    followUp: "Give an example of a time you remember doing this — a specific moment. What happened? What did you do? And after it was over, what did you feel about yourself?",
    followUpPlaceholder: "Take your time. Be specific. The more honest you are, the more accurate your wound map will be."
  },
  {
    id: 2,
    question: "When you have nothing to do and no one needs you, you feel:",
    type: 'single',
    options: [
      "Relieved — finally",
      "Restless and anxious, like I should be doing something",
      "Like I don't exist if I'm not useful",
      "Guilty",
      "Like something is about to go wrong"
    ],
    followUp: "Describe that feeling in more detail. Where do you feel it in your body? And when do you remember feeling it for the first time?",
    followUpPlaceholder: "Where in your body does it live? Chest, stomach, throat? Describe it..."
  },
  {
    id: 3,
    question: "Describe your relationship with your mother in one sentence.",
    type: 'open',
    followUp: "What did she never say or never show you that you needed most?",
    followUpPlaceholder: "What was missing? What did you wait for that never came?"
  },
  {
    id: 4,
    question: "Describe your relationship with your father in one sentence.",
    type: 'open',
    followUp: "What did his presence — or absence — teach you about your own worth?",
    followUpPlaceholder: "What lesson did you absorb about yourself from him?"
  },
  {
    id: 5,
    question: "As a child, to feel safe or loved, you had to be: (select all that apply)",
    type: 'multi',
    options: [
      "The good one",
      "The quiet one",
      "The smart one / the one who achieved",
      "The helpful one / the caretaker",
      "The invisible one — don't rock the boat",
      "The strong one — don't show weakness",
      "The funny one / the one who kept things light"
    ],
    followUp: "Tell me about a specific time you were that. And tell me what happened — or what you felt — when you weren't.",
    followUpPlaceholder: "A specific memory. What happened when you stepped outside that role?"
  },
  {
    id: 6,
    question: "What do you secretly want that you'd never say out loud?",
    type: 'open',
    followUp: "How long have you been carrying that? And what's the story you tell yourself about why you can't have it?",
    followUpPlaceholder: "The real story. Not the polished version."
  },
  {
    id: 7,
    question: "When you achieve something — a goal, a milestone, something you worked hard for — how long before it feels hollow and you need the next thing?",
    type: 'single',
    options: [
      "Less than 24 hours",
      "A few days",
      "A week or two",
      "I can actually sit with it — but it doesn't happen often",
      "I rarely let myself feel it at all"
    ],
    followUp: "Think of something specific you worked hard for and finally got. What happened the moment you had it? Be honest — what did the voice in your head say?",
    followUpPlaceholder: "What did the voice say? What happened to the feeling the moment you got there?"
  },
  {
    id: 8,
    question: "When there's conflict — in a relationship, at work, anywhere — you:",
    type: 'single',
    options: [
      "Fight to be heard until they understand",
      "Go quiet and swallow it",
      "Apologize to make it stop, even if I didn't do anything wrong",
      "Disappear — physically or emotionally",
      "Over-explain until I've talked the feeling to death"
    ],
    followUp: "Think of a specific conflict — recent or one that still stings. What did you actually do? And what did you wish you had said or done instead?",
    followUpPlaceholder: "The one that still comes up. What do you wish you'd done differently?"
  },
  {
    id: 9,
    question: "The thing you're most afraid people will find out about you is:",
    type: 'open',
    followUp: "Where does that fear come from? Is there a moment — a person — where you first learned that this part of you wasn't safe to show?",
    followUpPlaceholder: "Who taught you this part of you wasn't acceptable? When did you first hide it?"
  },
  {
    id: 10,
    question: "When something is wrong — before you've even processed it consciously — where do you feel it first in your body?",
    type: 'single',
    options: [
      "Chest / heart — tightness, pressure",
      "Stomach / gut — sinking or nausea",
      "Throat — constriction, like words are trapped",
      "Shoulders / back — weight, bracing",
      "I don't feel it in my body — I go numb"
    ],
    followUp: "Describe that sensation in as much detail as you can. Is it sharp or dull? Does it have a weight to it? And when you feel it — what do you usually do with it?",
    followUpPlaceholder: "Sharp or dull? Heavy or tight? What do you do when it comes?"
  },
  {
    id: 11,
    question: "When was the last time you did something purely for yourself, with zero guilt — meaning no one else benefited and you didn't justify it?",
    type: 'single',
    options: [
      "Recently, this feels pretty natural for me",
      "A few weeks ago, and I still felt a little guilty",
      "I honestly can't remember",
      "I'm not sure I've ever done that without explaining it to someone"
    ],
    followUp: "If you felt guilty — what did the guilt sound like? And whose voice was it?",
    followUpPlaceholder: "Whose voice did you hear? What did it say?"
  },
  {
    id: 12,
    question: "When someone offers to help you or do something for you, you feel:",
    type: 'single',
    options: [
      "Uncomfortable — I should be able to handle this myself",
      "Grateful, but then I feel like I owe them",
      "Suspicious — what do they want in return?",
      "Fine — I can receive help, it just doesn't happen often",
      "Panicked, like being helped means I've failed"
    ],
    followUp: "Think of a specific time someone tried to take care of you. What did you do? What did you feel? Did you let them?",
    followUpPlaceholder: "Did you let them? What happened in your body when they tried?"
  },
  {
    id: 13,
    question: "Growing up — directly or through tone, silence, or reaction — what were you told was too much about you?",
    type: 'open',
    followUp: "Who said it, or who showed it through their silence, their reaction, their distance? How old were you? And what did you decide to do with that part of yourself after?",
    followUpPlaceholder: "How old were you? What did you do with that part of yourself — hide it, shrink it, cut it off?"
  },
  {
    id: 14,
    question: "What pattern keeps showing up in your relationships, no matter how much work you've done?",
    type: 'open',
    followUp: "Give me the most recent example. What did you hope would be different this time? And what wasn't?",
    followUpPlaceholder: "The most recent time. What did you tell yourself would be different? What happened instead?"
  },
  {
    id: 15,
    question: "Complete this sentence honestly: The younger version of me most needed to hear...",
    type: 'open',
    followUp: "Where did you need to hear that most? In what room? From whom?",
    followUpPlaceholder: "In what room? At what age? From whose mouth?"
  }
]
