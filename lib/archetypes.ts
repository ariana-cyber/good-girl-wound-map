export interface Archetype {
  id: string
  name: string
  subtitle: string
  wound: string
  rootBelief: string
  bodyArea: string
  somaticPattern: string
  signs: string[]
  closingParagraph1: string
  closingParagraph2: string
  closingParagraph3: string
  integrationPractice: string
}

export const archetypes: Record<string, Archetype> = {
  PEACEKEEPER: {
    id: 'PEACEKEEPER',
    name: 'The Peacekeeper',
    subtitle: 'The wound: conflict = danger',
    wound: `She learned early that her anger, her disagreement, her needs created problems. So she became agreeable. She became easy. She smoothed every edge and swallowed every reaction until peace stopped being something she felt and became something she performed.

She is the woman who apologizes before she's done anything wrong. Who braces when someone's voice changes. Who shrinks herself before anyone asks her to.

Her body carries it in the chest and throat — where words go to die.`,
    rootBelief: 'If I make myself small enough, I will be safe. If I keep the peace, I will be loved.',
    bodyArea: 'chest and throat',
    somaticPattern: "your chest tightens and your throat closes before you can speak — your body learned to stop the words before they could cause damage",
    signs: [
      'You apologize reflexively, often before you know what for',
      'You feel responsible for other people\'s moods',
      'Your needs feel like burdens',
      'You\'ve never really learned what anger feels like in your body — only fear',
      'You attract people who take more than they give'
    ],
    closingParagraph1: `The Peacekeeper in you is way more common than you think. We cling onto identities as a strategy for survival and over time adjust to what feels comfortable. Your personality became a reflection of your personal reality — and after being so disconnected to your inner self, the wound became the baseline of not only your attraction but also for what you believe is possible.

That same identity is the reason you are sitting here right now, still wondering why you cannot just feel free. You learned the rules of survival so completely that you forgot you were ever allowed to want something different. The wound became your entire story — and after a while, the strategy became you.

This was designed for you to see that it is not your fault. Rather, it's what happens when a child has no other option.`,
    closingParagraph2: `Here's what most healing spaces won't tell you: you can understand your wound completely. You can name it, trace it, know exactly where it came from — and still be running it every single day.

Because the wound doesn't live in your thoughts. It lives in your chest and throat. In the way your words stop before they reach your mouth. Your body learned the rules too. And it has been keeping them faithfully ever since.

The nervous system does not update on information alone. It updates on felt experience. On feeling something new in the body, repeatedly, until that new thing becomes familiar. Until safety stops being an idea and starts being something you can actually feel.`,
    closingParagraph3: `What you need is not a list of boundaries or an affirmation that your needs matter. What you need is to survive disappointing someone. To say something true in a room where it might not land well — and not die. To feel the discomfort of someone being upset with you and stay present in your own body anyway.

Your nervous system needs proof that you will not be destroyed by disapproval. That proof doesn't come from believing it. It comes from experiencing it — again and again — in spaces safe enough to practice, until your body knows what your mind has been trying to tell it.`,
    integrationPractice: `Before you sleep tonight, write down one thing you wanted to say today that you didn't. Don't fix it. Don't soften it. Don't make it kind. Write what was actually true — the unfiltered version.

You don't have to send it. You don't have to do anything with it. Just let it exist somewhere outside of your body for the first time.

Notice what it feels like to let it be true.`
  },

  OVERACHIEVER: {
    id: 'OVERACHIEVER',
    name: 'The Overachiever',
    subtitle: 'The wound: worth lives in output',
    wound: `She learned that love and safety were conditional — and the condition was performance. So she achieved. She excelled. She built an identity out of being impressive. Stopping felt dangerous. Stillness felt like disappearing.

She is the woman who cannot rest without guilt. Who reaches the goal and immediately moves the goalpost. Who exhausts herself and calls it ambition.

Her body carries it in the shoulders and jaw — braced, always ready, always proving.`,
    rootBelief: 'I am only as valuable as what I produce. Rest is a luxury I haven\'t earned.',
    bodyArea: 'shoulders and jaw',
    somaticPattern: "your shoulders carry constant tension and your jaw stays braced — your body is always in proving mode, never allowed to rest",
    signs: [
      'You cannot enjoy an achievement for more than a day before needing the next one',
      'Doing nothing feels physically uncomfortable',
      'You feel guilty when you\'re not being productive',
      'You tie your worth to your output so tightly you don\'t know who you are without it',
      'You\'ve been told you\'re "a lot" or "intimidating" — and it stings because you\'re already trying to shrink'
    ],
    closingParagraph1: `The Overachiever in you is way more common than you think. We cling onto identities as a strategy for survival and over time adjust to what feels comfortable. Your personality became a reflection of your personal reality — and after being so disconnected to your inner self, the wound became the baseline of not only your attraction but also for what you believe is possible.

That same identity is the reason you are sitting here right now, still wondering why you cannot just feel free. You learned the rules of survival so completely that you forgot you were ever allowed to want something different. The wound became your entire story — and after a while, the strategy became you.

This was designed for you to see that it is not your fault. Rather, it's what happens when a child has no other option.`,
    closingParagraph2: `Here's what most healing spaces won't tell you: you can understand your wound completely. You can name it, trace it, know exactly where it came from — and still be running it every single day.

Because the wound doesn't live in your thoughts. It lives in your shoulders and jaw. In the way you brace and prove before anyone even asks you to. Your body learned the rules too. And it has been keeping them faithfully ever since.

The nervous system does not update on information alone. It updates on felt experience. On feeling something new in the body, repeatedly, until that new thing becomes familiar. Until safety stops being an idea and starts being something you can actually feel.`,
    closingParagraph3: `What you need is not permission to rest. You've given yourself permission a hundred times. What you need is to feel rest in your body without the guilt overriding it. To stay in stillness long enough for your nervous system to learn that you exist when you're not producing. That you are here, real, valuable, and enough — even when you have nothing to show.`,
    integrationPractice: `Set a timer for 10 minutes. Sit without your phone, without a task, without producing anything at all.

When the guilt or restlessness comes (and it will come) — don't fight it. Just notice it. Put your hand on your chest and say out loud: *I exist even when I'm not doing anything.* Then sit for the rest of the time.

This is not a meditation. It is proof of safety.`
  },

  INVISIBLE: {
    id: 'INVISIBLE',
    name: 'The Invisible One',
    subtitle: 'The wound: wanting is dangerous',
    wound: `She learned that her presence was a burden — that her wants, her needs, her visibility created problems. So she made herself small. She stopped asking. She stopped wanting loudly. She became the woman no one had to worry about.

She takes up as little space as possible. She minimizes her needs before anyone else can. She wants to be seen so badly it terrifies her — and so she hides.

Her body carries it in the stomach — a hollowness, a held breath.`,
    rootBelief: 'I am too much. My needs are a burden. If I disappear enough, I will finally be safe.',
    bodyArea: 'stomach',
    somaticPattern: "your stomach holds a constant hollowness — a held breath that never fully releases, waiting for permission to exist",
    signs: [
      'You minimize everything you want before saying it out loud',
      'You feel uncomfortable being the center of attention, even when you want it',
      'You default to "I don\'t mind" even when you do',
      'You feel guilty for wanting more',
      'You\'ve been overlooked so often you\'ve started doing it to yourself'
    ],
    closingParagraph1: `The Invisible One in you is way more common than you think. We cling onto identities as a strategy for survival and over time adjust to what feels comfortable. Your personality became a reflection of your personal reality — and after being so disconnected to your inner self, the wound became the baseline of not only your attraction but also for what you believe is possible.

That same identity is the reason you are sitting here right now, still wondering why you cannot just feel free. You learned the rules of survival so completely that you forgot you were ever allowed to want something different. The wound became your entire story — and after a while, the strategy became you.

This was designed for you to see that it is not your fault. Rather, it's what happens when a child has no other option.`,
    closingParagraph2: `Here's what most healing spaces won't tell you: you can understand your wound completely. You can name it, trace it, know exactly where it came from — and still be running it every single day.

Because the wound doesn't live in your thoughts. It lives in your stomach. In the hollowness, the held breath, the way your body braces before you ask for anything. Your body learned the rules too. And it has been keeping them faithfully ever since.

The nervous system does not update on information alone. It updates on felt experience. On feeling something new in the body, repeatedly, until that new thing becomes familiar. Until safety stops being an idea and starts being something you can actually feel.`,
    closingParagraph3: `What you need is to want something loudly and say it anyway. To take up space in a room and not apologize for it. Not because it will be comfortable — it won't be, at first — but because your body needs to learn that visibility is survivable. That being seen will not destroy you.`,
    integrationPractice: `Today, make one request without minimizing it first. No "if that's okay," no "you don't have to," no "never mind, it's not a big deal." Just the ask, clean.

It can be small. Ask for a specific thing at a coffee shop. Ask someone to move. Ask for what you actually want for dinner.

Say it. Then resist the urge to soften it after.`
  },

  FIXER: {
    id: 'FIXER',
    name: 'The Fixer',
    subtitle: 'The wound: I am safe when I am needed',
    wound: `She learned that her value lived in her usefulness. Love meant being needed. Safety meant solving. So she became everyone's safe place — the one with the advice, the answers, the energy to give. She poured endlessly. And quietly, her own cup emptied.

She does not know how to receive. Asking for help feels like weakness — or worse, like becoming a burden. Her needs don't get tended to because she never lets herself acknowledge them.

Her body carries it in the hands and heart — always reaching outward, never inward.`,
    rootBelief: 'I am loveable when I am useful. My needs don\'t matter. Being needed is the same as being loved.',
    bodyArea: 'hands and heart',
    somaticPattern: "your energy constantly moves outward through your hands and heart — always giving, always solving, while the inward flow stays blocked",
    signs: [
      'You go to advice before you\'ve fully heard someone',
      'You feel vaguely resentful of the people you help — and then guilty for feeling it',
      'You don\'t know what you actually need because you\'ve stopped asking',
      'Receiving anything — help, compliments, care — makes you uncomfortable',
      'You are everyone\'s safe place and you have nowhere to land'
    ],
    closingParagraph1: `The Fixer in you is way more common than you think. We cling onto identities as a strategy for survival and over time adjust to what feels comfortable. Your personality became a reflection of your personal reality — and after being so disconnected to your inner self, the wound became the baseline of not only your attraction but also for what you believe is possible.

That same identity is the reason you are sitting here right now, still wondering why you cannot just feel free. You learned the rules of survival so completely that you forgot you were ever allowed to want something different. The wound became your entire story — and after a while, the strategy became you.

This was designed for you to see that it is not your fault. Rather, it's what happens when a child has no other option.`,
    closingParagraph2: `Here's what most healing spaces won't tell you: you can understand your wound completely. You can name it, trace it, know exactly where it came from — and still be running it every single day.

Because the wound doesn't live in your thoughts. It lives in your hands and heart. In the way your energy always moves outward, always solving, always giving — while the inward flow stays blocked. Your body learned the rules too. And it has been keeping them faithfully ever since.

The nervous system does not update on information alone. It updates on felt experience. On feeling something new in the body, repeatedly, until that new thing becomes familiar. Until safety stops being an idea and starts being something you can actually feel.`,
    closingParagraph3: `What you need is to receive. Fully, without deflecting, without immediately giving something back. To let someone care for you and just stay in it. Your nervous system has been in output mode for so long it doesn't know how to be on the receiving end. That's the muscle you're building now.`,
    integrationPractice: `When someone shares a problem with you today — don't offer a solution. Don't fix it. Don't even suggest anything.

Just say: *That sounds really hard. I'm here.*

Then stop talking.

Notice the discomfort of holding space without solving it. That discomfort is the wound showing itself. You don't have to heal it today. Just see it.`
  },

  CHAMELEON: {
    id: 'CHAMELEON',
    name: 'The Chameleon',
    subtitle: 'The wound: I have no self without a mirror',
    wound: `She learned that who she was wasn't enough — or wasn't safe — so she became whoever the room needed. She morphed. She adapted. She read people so well she forgot to read herself.

She is magnetic, intuitive, able to make anyone feel understood. And underneath that: a woman who has no idea who she actually is. Who she is depends entirely on who she's with.

Her body carries it in the throat — the place where her real voice should live.`,
    rootBelief: 'Who I actually am is not enough. I am safe when I reflect what others want to see.',
    bodyArea: 'throat',
    somaticPattern: "your throat holds your real voice hostage — you learned so early to say what the room needed that your own voice became a stranger",
    signs: [
      'Your personality shifts significantly depending on who you\'re around',
      'You don\'t have strong opinions — or you do, but you won\'t say them until you know what someone else thinks',
      'You\'ve lost track of your actual preferences, your actual wants, your actual self',
      'You attract people who project onto you — and you let them because it feels like being seen',
      'You feel most yourself when you\'re alone — and most lost in relationships'
    ],
    closingParagraph1: `The Chameleon in you is way more common than you think. We cling onto identities as a strategy for survival and over time adjust to what feels comfortable. Your personality became a reflection of your personal reality — and after being so disconnected to your inner self, the wound became the baseline of not only your attraction but also for what you believe is possible.

That same identity is the reason you are sitting here right now, still wondering why you cannot just feel free. You learned the rules of survival so completely that you forgot you were ever allowed to want something different. The wound became your entire story — and after a while, the strategy became you.

This was designed for you to see that it is not your fault. Rather, it's what happens when a child has no other option.`,
    closingParagraph2: `Here's what most healing spaces won't tell you: you can understand your wound completely. You can name it, trace it, know exactly where it came from — and still be running it every single day.

Because the wound doesn't live in your thoughts. It lives in your throat. In the way your real voice stays hidden while another version speaks for you. Your body learned the rules too. And it has been keeping them faithfully ever since.

The nervous system does not update on information alone. It updates on felt experience. On feeling something new in the body, repeatedly, until that new thing becomes familiar. Until safety stops being an idea and starts being something you can actually feel.`,
    closingParagraph3: `What you need is friction. The kind that comes from having an opinion someone disagrees with — and not changing it. From showing up as yourself in a room that didn't ask for your real self — and staying anyway. Your identity was built in reaction to other people. It has to be rebuilt from the inside out.`,
    integrationPractice: `Write 5 things you genuinely like. Not what sounds good. Not what gets approval. Not what fits the version of you people know.

What do YOU actually like? Music, food, the way you like to spend a Sunday, something you secretly find funny, a feeling you chase.

If you don't know — write that. *"I don't know what I like and that terrifies me."* That's the most honest place to start. From here, answers will begin to flow.`
  },

  APPROVAL_SEEKER: {
    id: 'APPROVAL_SEEKER',
    name: 'The Approval Seeker',
    subtitle: 'The wound: love is conditional on performance',
    wound: `She learned that love came with conditions. That she had to be a certain version of herself to be accepted. So she performed. She curated. She became acutely attuned to what people wanted from her — and she gave it to them.

She lives in the gap between who she is and who gets love. And that gap exhausts her.

Her body carries it in the chest and stomach — the holding, the checking, the waiting to see how it landed.`,
    rootBelief: 'I am loveable when I am likeable. Disapproval means I am not enough.',
    bodyArea: 'chest and stomach',
    somaticPattern: "your chest holds and your stomach waits — after every interaction your body checks how it landed, running the same anxious scan before you've left the room",
    signs: [
      'You check how things landed — after conversations, after posts, after interactions',
      'You feel a disproportionate sting when someone doesn\'t respond well to you',
      'You edit yourself before you speak — filtering for what will be received well',
      'You struggle to make decisions without knowing how others will react',
      'Your self-worth fluctuates entirely based on external feedback'
    ],
    closingParagraph1: `The Approval Seeker in you is way more common than you think. We cling onto identities as a strategy for survival and over time adjust to what feels comfortable. Your personality became a reflection of your personal reality — and after being so disconnected to your inner self, the wound became the baseline of not only your attraction but also for what you believe is possible.

That same identity is the reason you are sitting here right now, still wondering why you cannot just feel free. You learned the rules of survival so completely that you forgot you were ever allowed to want something different. The wound became your entire story — and after a while, the strategy became you.

This was designed for you to see that it is not your fault. Rather, it's what happens when a child has no other option.`,
    closingParagraph2: `Here's what most healing spaces won't tell you: you can understand your wound completely. You can name it, trace it, know exactly where it came from — and still be running it every single day.

Because the wound doesn't live in your thoughts. It lives in your chest and stomach. In the holding and checking — the way your body scans how things landed before you've even left the room. Your body learned the rules too. And it has been keeping them faithfully ever since.

The nervous system does not update on information alone. It updates on felt experience. On feeling something new in the body, repeatedly, until that new thing becomes familiar. Until safety stops being an idea and starts being something you can actually feel.`,
    closingParagraph3: `What you need is to do something no one sees. To create, decide, act, exist — without tracking how it lands. Your worth has been outsourced for so long it feels like the feedback IS the feeling. It isn't. You need to find out what you actually feel before the audience weighs in.`,
    integrationPractice: `Do one thing today that you don't post, don't tell anyone about, and don't check the reaction to.

Create something. Go somewhere. Say something. Make a decision. And then let it exist only for you.

Notice the urge to share it. Notice what it feels like to hold something privately. That private self — the one who does things without an audience — is the one you're trying to find.`
  },

  CARETAKER: {
    id: 'CARETAKER',
    name: 'The Caretaker',
    subtitle: 'The wound: love = self-erasure',
    wound: `She learned that love meant giving everything. That her value was in her devotion. So she poured. She gave. She put herself last so consistently that she stopped knowing she had needs at all.

She is not weak — she is fiercely loving. But she confused love with disappearing. She thought giving herself away was generosity. It was survival.

Her body carries it in the gut and back — the heaviness of carrying what was never hers to carry.`,
    rootBelief: 'Love means I give everything. My needs come last. Being selfless is who I am.',
    bodyArea: 'gut and back',
    somaticPattern: "your gut and back carry a constant heaviness — the weight of everyone else's needs has lived there so long it feels like yours",
    signs: [
      'You don\'t know what you want because you stopped tracking it long ago',
      'You feel genuinely confused when someone asks about your needs',
      'You attract people who take — because giving is how you know you matter',
      'You feel guilty resting, receiving, or taking up resources',
      'You call it love. But part of you is exhausted, empty, and quietly resentful.'
    ],
    closingParagraph1: `The Caretaker in you is way more common than you think. We cling onto identities as a strategy for survival and over time adjust to what feels comfortable. Your personality became a reflection of your personal reality — and after being so disconnected to your inner self, the wound became the baseline of not only your attraction but also for what you believe is possible.

That same identity is the reason you are sitting here right now, still wondering why you cannot just feel free. You learned the rules of survival so completely that you forgot you were ever allowed to want something different. The wound became your entire story — and after a while, the strategy became you.

This was designed for you to see that it is not your fault. Rather, it's what happens when a child has no other option.`,
    closingParagraph2: `Here's what most healing spaces won't tell you: you can understand your wound completely. You can name it, trace it, know exactly where it came from — and still be running it every single day.

Because the wound doesn't live in your thoughts. It lives in your gut and back. In the heaviness — the weight of everyone else's needs that has lived there so long it started to feel like yours. Your body learned the rules too. And it has been keeping them faithfully ever since.

The nervous system does not update on information alone. It updates on felt experience. On feeling something new in the body, repeatedly, until that new thing becomes familiar. Until safety stops being an idea and starts being something you can actually feel.`,
    closingParagraph3: `What you need is to be inconvenient. To have a need that is not convenient for someone else — and let yourself have it anyway. To ask without immediately making it smaller. To receive without calculating what you owe. This will feel wrong at first. That feeling is the wound. Stay with it.`,
    integrationPractice: `Ask yourself once today, out loud: *What do I need right now?*

Then do it. Even if it's small. Even if it feels selfish. Even if no one else benefits.

Do not explain it to anyone. Do not justify it. Just do it — and let that be enough.`
  }
}
