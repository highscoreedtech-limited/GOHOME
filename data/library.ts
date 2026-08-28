import type { LibraryItem } from "@/types";

/**
 * Sample Messages Library content (frontend-only).
 *
 * This is the ONLY place resource content lives. The UI never hardcodes
 * resources, it consumes this array through the data-access layer in
 * `lib/library.ts`, so this file can later be swapped for an API/DB response
 * of the same shape without touching any component.
 *
 * Covers are deterministic picsum seeds (swap for real art in one place).
 * Some resources have `chapters`; some only have continuous `content`, this
 * is intentional so the optional Table of Contents can be exercised both ways.
 */

const cover = (seed: string) =>
  `https://picsum.photos/seed/njc-lib-${seed}/480/640`;

/** Canonical category order shown in the filter bar. */
export const CATEGORIES = [
  "All",
  "Bible Study",
  "Prayer",
  "Devotionals",
  "Christian Living",
  "Spiritual Growth",
  "Youth",
  "Family",
  "Leadership",
  "Faith",
  "New Jerusalem City",
] as const;

export const libraryItems: LibraryItem[] = [
  {
    id: "power-of-prayer",
    title: "The Power of Prayer",
    author: "Princess Vivian Mary Peace",
    category: "Prayer",
    description:
      "Prayer changes things, it changes you, it changes others, and it changes the world around you. A guide to a deeper, steadier life of prayer.",
    tags: ["prayer", "faith", "devotion", "intercession"],
    coverImage: cover("power-of-prayer"),
    estimatedReadingTime: "12 min read",
    featured: true,
    publishedAt: "2024-05-05",
    chapters: [
      {
        id: "introduction",
        title: "Introduction",
        content:
          "Prayer is not a last resort for the desperate; it is the first language of the faithful. Long before we understand its mechanics, our hearts already know how to reach for God.\n\nIn these pages we will not treat prayer as a formula to be mastered, but as a friendship to be kept. The needy of the world are waiting, and Heaven has chosen to move through those who will simply show up and ask.",
      },
      {
        id: "understanding-prayer",
        title: "Understanding Prayer",
        content:
          "To understand prayer we must first understand who we are speaking to. We do not pray into the void; we pray to a Father who leans in to listen.\n\nPrayer is less about the perfection of our words and more about the posture of our hearts. The shortest, most honest prayer offered in faith reaches farther than the most eloquent speech offered in doubt.\n\nWhen we pray, we align ourselves with the will of Heaven. We stop asking God to bless our plans and begin asking Him to make us part of His.",
      },
      {
        id: "growing-through-prayer",
        title: "Growing Through Prayer",
        content:
          "A life of prayer is grown, not downloaded. It begins with small, faithful moments, a whispered thanks, a quiet request, a pause to listen.\n\nOver time these moments knit together into a rhythm, and that rhythm becomes a refuge. The one who prays daily is never truly alone, never truly without counsel, never truly without strength.\n\nDo not measure your growth by your feelings. Measure it by your faithfulness. Keep showing up, and prayer will do in you what striving never could.",
      },
    ],
  },
  {
    id: "walking-in-faith",
    title: "Walking in Faith",
    author: "John Doe",
    category: "Faith",
    description:
      "Faith is not the absence of fear but the decision to move forward anyway. A three-part book on trusting God through every season.",
    tags: ["faith", "trust", "obedience", "journey"],
    coverImage: cover("walking-in-faith"),
    pages: 128,
    estimatedReadingTime: "18 min read",
    featured: true,
    publishedAt: "2024-03-12",
    chapters: [
      {
        id: "chapter-1",
        title: "Chapter 1, The First Step",
        content:
          "Every journey of faith begins with a step taken before the whole path is visible. God rarely shows us the staircase; He shows us the first stair.\n\nAbraham left his country not knowing where he was going. That is the shape of faith, obedience that moves before it fully understands.",
      },
      {
        id: "chapter-2",
        title: "Chapter 2, Through the Valley",
        content:
          "Faith is tested not on the mountaintop but in the valley. It is easy to trust when the sun is warm; it is another thing entirely to trust in the dark.\n\nYet the valley is not punishment, it is preparation. What grows in the shadow often grows the deepest roots.",
      },
      {
        id: "chapter-3",
        title: "Chapter 3, Arriving Home",
        content:
          "The end of faith is not a destination on a map but a person: Christ Himself. To walk in faith is to walk toward Him until walking becomes dwelling.\n\nAnd when we arrive, we discover He was with us on every step of the road we thought we walked alone.",
      },
    ],
  },
  {
    id: "growing-in-grace",
    title: "Growing in Grace",
    author: "Sister Mary Agnes",
    category: "Spiritual Growth",
    description:
      "Grace is not only how we are saved, it is how we grow. Learn to cooperate with the quiet, patient work God is doing in you.",
    tags: ["grace", "growth", "transformation", "holiness"],
    coverImage: cover("growing-in-grace"),
    estimatedReadingTime: "10 min read",
    publishedAt: "2024-02-20",
    chapters: [
      {
        id: "the-soil-of-the-heart",
        title: "The Soil of the Heart",
        content:
          "Grace falls on every heart like rain, but not every heart receives it the same way. The soil matters. A soft, humble heart drinks deeply; a hardened one lets grace run off.\n\nOur work is not to manufacture growth but to keep the soil tender, through repentance, through worship, through mercy shown to others.",
      },
      {
        id: "seasons-of-growth",
        title: "Seasons of Growth",
        content:
          "Growth is seasonal. There are springs of rapid change and winters that feel like nothing is happening at all.\n\nDo not despise the winter. Beneath the frozen ground, roots are still reaching. God is never idle, even when we cannot see the work.",
      },
    ],
  },
  {
    id: "journey-through-the-scriptures",
    title: "A Journey Through the Scriptures",
    author: "Deacon Paul Okeke",
    category: "Bible Study",
    description:
      "A guided walk through the great story of Scripture, from creation to the New Jerusalem, and how it all points to Christ.",
    tags: ["bible", "study", "scripture", "salvation history"],
    coverImage: cover("journey-scriptures"),
    pages: 96,
    estimatedReadingTime: "20 min read",
    featured: true,
    publishedAt: "2024-01-15",
    chapters: [
      {
        id: "in-the-beginning",
        title: "In the Beginning",
        content:
          "Scripture opens not with a rule but with a relationship, a God who creates out of love and calls it good. To read the Bible rightly, we must begin here, in the garden of God's intention.",
      },
      {
        id: "the-promise",
        title: "The Promise",
        content:
          "Through patriarchs and prophets, one thread runs unbroken: a promise. God binds Himself to a people and, through them, to the whole world. Every covenant is a step toward the One who would fulfil them all.",
      },
      {
        id: "the-fulfilment",
        title: "The Fulfilment",
        content:
          "In the fullness of time the promise took on flesh. All the longing of the Old Testament finds its answer in Christ, and all the hope of the New finds its home in the City that is to come.",
      },
    ],
  },
  {
    id: "a-message-of-hope",
    title: "A Message of Hope",
    author: "New Jerusalem City",
    category: "Christian Living",
    description:
      "For anyone walking through a hard season, a short, continuous message to remind you that you are not alone and your story is not over.",
    tags: ["hope", "encouragement", "comfort"],
    coverImage: cover("message-of-hope"),
    estimatedReadingTime: "5 min read",
    publishedAt: "2024-06-01",
    content:
      "There are seasons when hope feels like a language we have forgotten how to speak. The days blur together, prayers feel like they bounce off the ceiling, and the future looks like a closed door.\n\nIf that is where you are, hear this gently: you are not alone, and you are not forgotten. The same God who numbers the stars also numbers your tears. Nothing you are carrying is hidden from Him.\n\nHope is not the denial of hardship. It is the quiet confidence that hardship does not get the final word. The story of faith is full of dark chapters that were not the ending, the empty tomb was preceded by a very real Friday.\n\nSo do not measure your whole life by this one page. Keep breathing, keep praying, keep taking the next small step. Reach out to your community; let others carry what you cannot carry alone.\n\nThe Ark of the New Jerusalem has been made open to all. There is room for you, exactly as you are today. Do not miss it. Enter in, and let hope find you again.",
  },
  {
    id: "do-no-aggrieve",
    title: "Do Not Aggrieve the Holy Spirit",
    author: "Holy Archangel Sheila",
    category: "Christian Living",
    description:
      "A prophetic word from Holy Archangel Sheila on silence and subordination, the Blood and the mercy of God, the Blessed Virgin, and the account each of us must give before the Government of Heaven.",
    tags: ["holy spirit", "prophecy", "subordination", "accountability"],
    coverImage: "/holy-spirit-cover.png",
    estimatedReadingTime: "10 min read",
    publishedAt: "2024-05-18",
    content: `Holy Archangel Sheila said, "Every time you are here, reports keep coming. (Strange language.) Talk, talk, talk, talk. (Strange language.) Can you not keep quiet and focus on your work? Even as I finish speaking, (strange language), the Lord is bringing forth His disciplinary action if you do not change and turn away from your corrupt nature.

"Have you not heard everything? Even the rich are seeking to be glorified in the Word of God, the raw and living Word of God. The poor are doing the same, yet you are here making yourselves the object of another person's ridicule. (Strange language.) I think I will stop giving you the code. I think I will stop it." (Strange language.)

We pleaded with Him to pardon us.

He continued, "I will stop giving you the code because, if I give it to you, you will only continue to misuse it."

We continued pleading with Him.

He spoke in a strange language and then continued in English:

"This is the Government of Heaven; it is not the government of the world. The world you have seen has become shattered. It has become damaged beyond repair. Jesus is now repairing soul by soul, no longer your environmental entities. He is not interested in your surroundings; He is interested in you. Who are you? Are you ready for Me?

"If you are ready for Me, then follow Me. That is what Heaven desires, because this world, as you see it, will one day be swept away. The first world was swept away, and it was because of one man that God spared it. Otherwise, humanity would have been completely wiped out, and nothing would have remained of it. But after sitting in His love, His mercy, and His sorrow, He arose and said, 'No. If I destroy humanity, My labour will be in vain. I must recover them. They are made in My own image. Shall the evil one continue to ridicule Me?'

"So He chose to place Himself in a position of humility and mockery to make sure that you would return to Him. The first world was destroyed by water, and He brought forth a new world through water. That is why everyone must pass through the grace of Baptism. After Baptism comes the sacrifice that you bear upon your head, the sacrifice of Blood, which perfects all things so that sin may no longer have dominion over you, unless you choose to return to Egypt."

He spoke in a strange language and then said in English:

"I see many things. I see, see, see, see. (Strange language.) You are no longer afraid of God, and it pains Us. Many angels are ready to wipe the world away, but because of the love of God and the love of Christ, (strange language), any angel who raises a hand will lower it once the Blood intervenes, because the Holy Spirit will stand as the Intercessor.

"Do you think We are happy? Do you think We rejoice when you do things that do not glorify God?

"After Lucifer and those whom he was able to deceive departed from the glorious realm of God, you came into this world and began to do the very same things. You have followed his example, after the enemy chose to wield the power of the staff to bring mayhem into the house of God.

"You cannot defeat God. No one has ever defeated God. If the Lord has chosen you and entrusted you with the key, then you must possess the spirit of subordination. It is very, very, very, very important."

Holy, holy, holy! Is the Lord!

There is no other God! Except Jesus Christ!

"If what you have to say is not of good and noble purpose, then keep silent. Every one of you is on a journey, and your journey should not become a source of ridicule to your own dwelling place. You must speak of things that glorify the name of God. (Strange language.) You discuss, you talk, and at the slightest opportunity, you reveal things that should not be revealed. (Strange language.) To jeopardize another person's destiny is a very serious offence. (Strange language.) You ridicule a heart that has done nothing to deserve being treated as a rebel. (Strange language.) Most of the things you say are neither relevant nor true.

"Let Me tell you this: in Heaven, there are spirits that understand the worth of the Blessed Virgin. There are spirits that align themselves with Her spiritual aura and become exceptional in glory. There are also spirits that have nothing to do with Her essence, because they neither recognise nor accept Her, and so their connection becomes distant.

"Are We speaking of those who are condemned? Yes.

"Do you think Lucifer is not fighting, together with his own followers, against the mantle of the Virgin wherever he can? That is why the Bible says in the Book of Genesis 3:15, 'I will put enmity between you and the woman, and between your offspring and her offspring.'

"Which serpent is being spoken of? The serpent that deceived Eve. And who took possession of that serpent? Lucifer.

"He knows many things about creation, but there is one thing he does not know: love. Love is the most hidden sanctuary of the Most High God, a place where no one can enter.

"It was from that place that His Son came forth, and when His Son came forth, He became the perfect source of rejoicing."

Holy, holy, holy! Is the Lord!

"Imperfection became what? Perfect. (Strange language.) If you love a heart that glorifies God, 'mejamie nsha ma,' stop corrupting other people's minds. You are on a journey. Everyone has their daily crosses, and as this journey continues, the only thing you are meant to do is to help one another. When you help one another, it releases different kinds of grace and spiritual alignment upon you.

"The Mother of Jesus Christ: the reason She is where She is today, even though She carries the attribute of divinity, is because She is part of God projected out of Himself and made into a female form so that She could give birth to His Son.

"No one can give birth to God. Human beings cannot give birth to God. That is why Jesus was born without sin.

"If Mary, the Mother of Jesus, and Ann and Joachim, were they not husband and wife? Do you know who they are? (Strange language.) 'ama fueni,' that is a story for another day. 'Oja maya shiye.'

"God plans, God executes, and God fulfils. That is what I have come to tell you.

"If you do not love the character of His divine purpose, then do not associate yourself with Him. Because if you love Christ, you must be fully committed to Him, not divided or partial. You cannot give Him a portion and keep the rest for yourself. You must work on yourself. All of these things require accountability. Everyone must give account of what they have done and what they have spoken.

"You heard when the Holy Spirit said that even if you enter Heaven and come into light, there are still limitations to where you can have access.

"All of these struggles you experience: do you know that building this City is not an easy mission?

"All your efforts, your thoughts, your soul, and your spirit, everywhere you go, you speak and engage, and at the end of the day the Holy Spirit may say, because of certain things, I will not allow you to exercise authority over a particular dimension of divinity. What a calamity! Because of human nature that you refuse to control."`,
  },
  {
    id: "destiny-angels",
    title: "Destiny Angels",
    author: "Holy Archangel Sheila",
    category: "Faith",
    description:
      "A prophetic word from Holy Archangel Sheila on the record-keeping angels of destiny, the war with Lucifer, Michael the defender, and the coming Book of the Joyful Constellations.",
    tags: ["angels", "destiny", "prophecy", "obedience"],
    coverImage: "/destiny-angels-cover.png",
    estimatedReadingTime: "13 min read",
    publishedAt: "2024-05-12",
    chapters: [
      {
        id: "abandoning-your-angel",
        title: "Abandoning Your Angel",
        content: `Aha! I have seen many people abandon their Angels to go and do their own thing, their own way. God is not liable; Judgement Day is a day of recompensation (reimbursement, payment). On that day, you don't have anything to say because you already know what you have done yourself.

It is not easy. Some of the destiny Angels will move to, maybe you have eighty kilometres to go before you fulfill your mission, you move forty, the next thing, you drag your feet because you do not want to go further. You say, 'It is too tedious,' and your destiny Angel will be telling you, 'Please, please,' and you say, 'No,' because the other road is waiting for you. 'Go, go, go,' and somebody makes a suggestion, fiam! you join the person because you want to make money. They will go and do rituals for you to become rich, and this is what you call different, different slogans of your commitment, because you want the god of mammon, and the god of mammon confuses you and the energy of your destiny is jeopardized. That is the reason.`,
      },
      {
        id: "record-angels",
        title: "Destiny Angels Are Record Angels",
        content: `Your guardian Angel will never let go. He will keep fighting even at that level of your death to see that any chance given is used, because if he comes back to God, God will ask him terrible questions. And if the questions are not well answered, because your Angel could be giving a destiny report about you: from the time you received your first salvation, what did you do? What was your commitment? Your family, the day you were born, your growth, your school, your movement, what was your contribution in your environment? How did you grow? Was there a time somebody came to speak to you about Jesus? What was the reaction? What have you gained out of it? Did you say, 'This man, get out, what are you talking about? I don't want to know Jesus.'? Every record will be written down on your behalf. Are you listening to me? There will be records.

He spoke in Igbo language and said, "ndi kachasi ede record, I ma ndi kachasi ede record? Angels of destiny, they don't joke with records. Even, okwu o na agwa ndi mmadu, nke o na edeputa n'obi gi, ozigbo o na eche ya, odego ya ozigbo, because he does not want to have problem with God. When he goes back to God, he will give the report; if he says, 'God, You told me to tell him; I told him but he did not listen,' he will take note of the time, he will show God the time and say, this was the time I told him in the earthly world, 12 pm, when he was eating, I spoke to him, I even brought somebody to talk to him, I called a child to speak to him, I even called his mother to speak to him and I even called his friend, but he refused to listen. Look at the period, look at everything, 'ha kakwa edekwa gini?' Record."`,
      },
      {
        id: "lucifer-and-his-agents",
        title: "Lucifer and His Agents",
        content: `He spoke in a strange language and remarked, "When you people call the name 'queen of the coast,' where do you think the name is from? Why are you so much afraid of mundane things that lucifer tried to show with fear and make you people afraid? Do you know the greatest thing you are afraid of on earth? Can you tell me the greatest thing you can be afraid of? (2 times). If you have your God as a habitat, there is something you should be much afraid of: 'Sin,' that is what you should be afraid of, and especially the sin of what? Disobedience."

He spoke in a strange language. Aha! That sin is a 'wahala' o o, ha!

He spoke in a strange language and then said in English language, "That is what lucifer is going through now, and he cannot come back to God, but we are all busy moving around God's presence. Every Angel that comes in contact with lucifer, do you know what lucifer will tell him? Bow or I slaughter (2 times)! That was what he was doing then, but what happens now? I have a mark on me, and that mark is the spiritual identity of who I am serving, and that is the mark of the Master."

He spoke in a strange language and continued, "Whenever he sees me, I just stand before him and say, bow or I slaughter."

He spoke again in a strange language and said in English language, "And he will not talk, he will 'vamus' (vanish); but if it were before, ah!"

He spoke again in a strange language and continued in English language, "Many Angels suffered oo, suffered. If you are moving on God's mission, you have to be careful. We call him the 'Beluliat.' Every Angel will be asking every minute, did you meet him? (3 times) This is a sorrow he brought to heavenly government."`,
      },
      {
        id: "michael-the-defender",
        title: "Michael the Defender",
        content: `It was Michael that was defending. In fact, as soon as you call Michael, Michael will appear, and you will keep on going on your mission, and Michael will settle the score with Lucifer. Maybe, by the time you will be coming back from your mission, the scores have not been settled, they are still fighting, but he has given you way to carry out God's decision.

He spoke in a strange language and continued in English language, "Didn't you see the story in the book of Daniel? Dan. 10:13. And it is for your (human) sake that we (Angels) were all suffering. I don't know what God sees in you, He loves you very much and you are all mesmerizing Him. Why? He loves you so much; even now, God is crying about humanity. He will be asking, have you seen My son, Innocent? Have you seen My daughter, Clementina? Have you seen this person? This is how He will keep searching and searching."`,
      },
      {
        id: "fate-of-angels",
        title: "The Fate of Angels",
        content: `Archangel Sheila bemoaned, "Woe unto Angels that left and just go like that! An Angel that will be sleeping in his duty, and when everything was checked and he was found guilty, the Angel will be taken to the guardroom. Do you know the meaning of guardroom? This is a place where God takes Angels that did not do their work, though they were not disobedient. If you talk about disobedience, you are vanishing eternally. Yes, if you are talking about not accomplishing one's duty because a soul is lost, you will suffer o (2 times); but when you talk about being disobedient, you are vanishing, 'adi-ekwu ya ekwu.'"`,
      },
      {
        id: "the-patience-of-god",
        title: "The Patience of God Upon Man",
        content: `You, man, when you commit the sin of disobedience, God still gives you a later time to see if you can rebuild your constituency, because each human being is a constituency of its own. The way God sees you is not the way God sees us (the Angels). We are all obedient servants, but in your own case, you are a family member (a child). You have the right to tell me, 'Vanish, go,' and I will go if you have merited God's level. That was why during the time of Abraham, didn't you see how He treated Abraham? Any country Abraham entered, ha, all eyes were watching him.

Holy Archangel Sheila spoke in a strange language and recounted, "Every principality in the arena would become faithful to him, they would be serving him, they would not even touch anything around him, because if you did, you will be in trouble. In the physical, God made sure that everything was working well for Abraham except the one He commanded, 'Abraham, you are going to go through this for My sake.'"

Holy, holy, holy! Is the Lord!

There is no other God! Except Jesus Christ!

Jesus Christ of Nazareth is the Lord! Forever and ever!`,
      },
      {
        id: "angels-do-not-greet",
        title: "Angels Do Not Greet Like Human Beings",
        content: `But it does not matter to us, we are the Angels, we are spirits. Me, greeting? The only way I can greet you is when you are very, very subordinate to things of God. When God told Holy Archangel Gabriel to go and visit Mary, did Gabriel just go? God told him to go to the house of so, so place, 'you will meet My damsel, greet Her that I am on My way.' It is His own body. Is She not God's body? It is just like, 'I have finished building my house, members o, neighbours o, friends o, I am calling you to come and help me do the dedication, do the house opening, it is time for me to enter my house.' Are you not a thief when you are not the owner of the house?

He spoke in a strange language and continued in English language, "If you are a thief, they will chain you because you are not the owner of the house. This is the way it is with God. When Gabriel was commanded by God," he spoke in a strange language, and continued in English language.`,
      },
      {
        id: "the-meaning-of-archangel",
        title: "The Meaning of Archangel",
        content: `Holy Archangel Sheila asked, "Do you know the meaning of arch? Go and google the meaning of arch. When you say arch, if you want to stop a very big ship from moving, what do you use to stop it? You will use an anchor. Immediately you throw it inside the sea, gwom! It will do what?"

He spoke in a strange language, "Makuru majaa!" It will stop the ship, it will tell the ship, don't go further, the ship cannot go away. When you say an Angel is an Archangel, hmm! Disturbance dey o! We are the giant police.

If God says, I want punishment to go on, I want Gaza to receive punishment, but I want you to use flood. If I reach Gaza, I will stand at the gate of Gaza, I will call the inhabitants of Gaza who are Ephramites, I will stand there and speak the word of their fathers, and I will tell them that I am here to carry out the words of the Creator Himself; that I am not liable for this punishment, but because you have decided to fight against God, the Lord commissioned me to cause you pain, and He said, 'Do that with flood.' As I am talking about it, the ground is already listening to me. I will now decide and say, 'I call on you,' because there is a spirit that is called the spirit of flood, it comes with death. And as soon as I mention the name of that spirit that is in charge of that particular territory, there will be a meal there will obey me because they don't have any choice. They have already seen that there is a messenger, and as I release them, they will come out with the very strong flood that they are causing. I will only be hearing, waiting to hear from God when He will say, 'Stop!' Then I will commission them to go back to their duty post, and that will seal the connection of their channel of destruction. Are you listening to me? As soon as I am done, I will say, 'I have finished Your work.' If it is the one that I would turn myself into flood, I will turn myself into flood and go and stand at the gates where the leader is, and I will condition the rest of my body to become flood. On my head, I will be standing at the mountain of the Presidential Seat, that is their own office, so that it will not swallow the whole city. The flood may be a flood of blood, war, famine, or anything that God wants me to go with.

He spoke in a strange language and continued in English language, "If you are an Angel and God did not send you to go and do something, and you go and do that thing, in fact, God will banish you from His presence for many thousands of years. He will not destroy you; the only way God destroys any Angel is what? Disobedience. And if you went without being sent, that is, God did not send you, maybe you saw what they were doing and you were not happy, you then decide to go and punish them. God will ask you, 'Did I send you?' (2 times). You will be telling God, why did they do that? You said, 'Thus says the Lord, my Lord. You said, every child that was born in that city at the age of so, so, must receive the blessing of baptism, and every woman in that place must receive the consecration of marriage. Look at what they are doing, they are destroying the Church, they are making everywhere smell.' God will tell you, 'Did I say you should go there?'"

He spoke in a strange language and continued in English language, "They will chain you o. God will say, 'You are fighting for Me, but did you ask Me?' Yes, no commandment, hei!"`,
      },
      {
        id: "joyful-constellations",
        title: "A Book Called the Joyful Constellations",
        content: `There is no other God, except Jesus Christ. That is why when we see Jesus, you will hear the Angels say, 'There is no other God, except Jesus Christ!' So, there is a signal for the whole world. Please, be fast so that you can bring out souls (2 times); heaven will rejoice immensely at the birth of these souls in the City because it is a great and enormous crowd. Be patient with God. That is why now, the Lord is raising seven pinnacles of altars representing the seven Archangels that are always in God's presence. There are many souls who have more power, in short, who are stronger than some Angels, and they are worshipping such souls. Angels are bowing; in short, Angels are serving such souls, just like you get demons serving high spiritual human beings that are serving Lucifer. You know, anything that Lucifer is doing, he is mimicking it from God. Are you listening to me? So, this time...

He then spoke in Igbo language, "Enwelu akwukwo enigwe na-eje imepe." (There is a book that heaven wants to open.) Heaven is calling it 'the Joyful Constellations.' Akwukwo a, enigwe na-eje imepe ya (this book that heaven is about to open), aga emepe ya from the tunnel of the City (it will be opened from the tunnel of the City), and it has seven back covers, each of them representing an Archangel. They will go round the world and begin to pick every soul that belongs to the New Jerusalem City. Anywhere they go, they will sign the person with a mark, "aga enye gi mark" (you will be given a mark), and this mark, wherever you are, will locate you and bring you.`,
      },
    ],
  },
  {
    id: "mornings-of-mercy",
    title: "Mornings of Mercy",
    author: "Sister Mary Agnes",
    category: "Devotionals",
    description:
      "A short devotional to begin your day in the mercy of God, a few quiet minutes to reset your heart before the world rushes in.",
    tags: ["devotional", "mercy", "morning", "quiet time"],
    coverImage: cover("mornings-of-mercy"),
    estimatedReadingTime: "8 min read",
    featured: false,
    publishedAt: "2024-04-02",
    chapters: [
      {
        id: "day-one",
        title: "Day One, New Every Morning",
        content:
          "God's mercies are new every morning. Whatever yesterday held, failure, fear, or grief, it does not get to define today. Receive this morning as a gift freshly wrapped by grace.\n\nPause. Breathe. Whisper thank you before you whisper anything else.",
      },
      {
        id: "day-two",
        title: "Day Two, Mercy Received, Mercy Given",
        content:
          "The mercy we receive is meant to move through us. Ask God this morning to show you one person to whom you can be merciful today, a kind word, a second chance, a quiet act of help.\n\nMercy hoarded grows stale; mercy shared multiplies.",
      },
      {
        id: "day-three",
        title: "Day Three, Rest in the Mercy",
        content:
          "You do not have to earn what has already been given. Before you plan, before you strive, rest for a moment in the settled fact that you are loved.\n\nFrom that rest, go and toil for the needy, not to be accepted, but because you already are.",
      },
    ],
  },
  {
    id: "youth-ablaze",
    title: "Youth Ablaze",
    author: "Brother Emeka",
    category: "Youth",
    description:
      "You are not too young to be used by God. An energising message for young hearts ready to live boldly for Christ.",
    tags: ["youth", "purpose", "boldness"],
    coverImage: cover("youth-ablaze"),
    estimatedReadingTime: "6 min read",
    publishedAt: "2024-04-20",
    content:
      "Do not let anyone look down on you because you are young. The Kingdom of God has never waited for people to grow up before it changed the world through them.\n\nDavid was a boy with a sling. Mary was a young woman with a yes. Timothy was a youth entrusted with a church. Heaven has a long history of setting the young on fire.\n\nThe world will offer you a thousand small ambitions. Christ offers you one great purpose. Do not trade the fire of your calling for the comfort of the crowd.\n\nStay close to God, keep good company, serve where you are, and refuse to be lukewarm. A youth ablaze for God lights rooms that sermons never reach.",
  },
  {
    id: "the-holy-family-way",
    title: "The Holy Family Way",
    author: "Mr. & Mrs. Nwosu",
    category: "Family",
    description:
      "Building a home where God is at the centre, practical wisdom for families who want to grow in faith together.",
    tags: ["family", "marriage", "parenting", "home"],
    coverImage: cover("holy-family-way"),
    estimatedReadingTime: "9 min read",
    publishedAt: "2024-03-30",
    chapters: [
      {
        id: "a-home-with-an-altar",
        title: "A Home with an Altar",
        content:
          "Before a home is decorated, it must be dedicated. The strongest families are not those without trouble but those who bring their trouble to God together.\n\nMake room in your week for shared prayer. It need not be long or eloquent, only honest and regular.",
      },
      {
        id: "raising-arrows",
        title: "Raising Arrows",
        content:
          "Children are not ornaments to display but arrows to aim. Our task is not to keep them comfortable but to point them toward God and, in time, to release them well.\n\nWhat we model matters more than what we lecture. Let them catch faith by watching it lived.",
      },
    ],
  },
  {
    id: "leading-with-grace",
    title: "Leading with Grace",
    author: "Deacon Paul Okeke",
    category: "Leadership",
    description:
      "Servant leadership for ministry and beyond, how to lead people the way Christ led: with humility, patience, and grace.",
    tags: ["leadership", "service", "humility"],
    coverImage: cover("leading-with-grace"),
    pages: 84,
    estimatedReadingTime: "15 min read",
    publishedAt: "2024-02-05",
    chapters: [
      {
        id: "the-towel-and-the-basin",
        title: "The Towel and the Basin",
        content:
          "On the night He was betrayed, the King of Glory took a towel and washed feet. That is the pattern of Christian leadership, authority expressed as service.\n\nLeaders who grasp for status lose their people. Leaders who kneel to serve are the ones others gladly follow.",
      },
      {
        id: "leading-through-storms",
        title: "Leading Through Storms",
        content:
          "Every leader is eventually tested by a storm. In the storm, people do not need a leader who panics; they need one who prays.\n\nYour calm is a gift to your community. Anchor yourself in God first, and you will have something steady to offer everyone else.",
      },
    ],
  },
  {
    id: "entering-the-ark",
    title: "Entering the Ark",
    author: "New Jerusalem City",
    category: "New Jerusalem City",
    description:
      "The vision of the New Jerusalem City and the invitation held open to all, understand the Ark and why it must not be missed.",
    tags: ["new jerusalem", "vision", "revelation", "charity"],
    coverImage: cover("entering-the-ark"),
    estimatedReadingTime: "11 min read",
    featured: true,
    publishedAt: "2024-06-10",
    chapters: [
      {
        id: "the-city-revealed",
        title: "The City Revealed",
        content:
          "The New Jerusalem City was shown to John on the island of Patmos, a city coming down from Heaven, where God dwells with His people and every tear is wiped away.\n\nWhat was given as comfort to a persecuted church is given again to us as invitation. The City is not only a future hope; it is a present call.",
      },
      {
        id: "the-yoke-of-charity",
        title: "The Yoke of Charity",
        content:
          "The way into the City is the way of mercy. Our motto is simple and demanding: toiling for the needy for their eternal life through the yoke of charity.\n\nCharity is not an add-on to faith; it is faith made visible. The works of mercy are the badge of those preparing for the City.",
      },
      {
        id: "enter-the-ark",
        title: "Enter the Ark",
        content:
          "As in the days of Noah, an Ark has been prepared, and its door stands open. There is room for all who will come, but the door will not stand open forever.\n\nDo not delay. Enter the Ark. Bring others with you. This is the work of the hour.",
      },
    ],
  },
];
