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
    author: "Princess Vivian Mary Peace",
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
    author: "New Jerusalem City",
    category: "Faith",
    description:
      "Your guardian angel will never let go, a message on the unseen help Heaven sends to guard your calling.",
    tags: ["angels", "protection", "destiny"],
    coverImage: cover("destiny-angels"),
    estimatedReadingTime: "5 min read",
    publishedAt: "2024-05-12",
    content:
      "Your guardian angel will never let go. Even when the fight is fierce and you feel yourself slipping, Heaven has assigned help to your side that does not tire and does not retreat.\n\nWe were never meant to walk our destinies alone. From the moment God set a purpose over your life, He also set watchers over your path, messengers who war for the calling you sometimes forget you carry.\n\nThis is not a reason for fear but for courage. The battles you face are real, but so is the help. When you pray, you are not shouting into an empty sky; you are calling on a Kingdom that answers.\n\nSo lift your head. Keep walking. The One who began a good work in you has not left you undefended, and He will bring it to completion.",
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
