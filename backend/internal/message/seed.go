package message

// seed returns starter content. In Phase 1 this stands in for the database;
// when Postgres arrives, the Postgres repository replaces this and the rest of
// the app is untouched. The data mirrors the frontend's data/library.ts.
func seed() []Message {
	return []Message{
		{
			ID:                   "glory-of-virginity",
			Title:                "The Glory of Virginity",
			Author:               "The Holy Spirit",
			Category:             "Christian Living",
			Description:          "The Holy Spirit speaks on the great glory and favours that accompany virginity, purity before marriage, and faithfulness within the home.",
			Tags:                 []string{"virginity", "purity", "marriage", "holy spirit", "youth"},
			CoverImage:           ptr("/glory-of-virginity-cover.png"),
			EstimatedReadingTime: ptr("7 min read"),
			PublishedAt:          ptr("2015-11-11"),
			Chapters: []Chapter{
				{ID: "the-pride-of-virginity", Title: "The Pride of Virginity", Content: "I am addressing the young ones. If you wish to have it well in your life, put on the pride of virginity."},
				{ID: "the-new-jerusalem", Title: "The New Jerusalem", Content: "Enter the Ark of the New Jerusalem now. Do not be left out, as in the days of Noah."},
			},
		},
		{
			ID:                   "do-no-aggrieve",
			Title:                "Do Not Aggrieve the Holy Spirit",
			Author:               "Holy Archangel Sheila",
			Category:             "Christian Living",
			Description:          "A prophetic word on silence and subordination, the Blood and the mercy of God, and the account each of us must give before the Government of Heaven.",
			Tags:                 []string{"holy spirit", "prophecy", "subordination", "accountability"},
			CoverImage:           ptr("/holy-spirit-cover.png"),
			EstimatedReadingTime: ptr("10 min read"),
			PublishedAt:          ptr("2024-05-18"),
			Content:              ptr("If what you have to say is not of good and noble purpose, then keep silent."),
		},
		{
			ID:                   "destiny-angels",
			Title:                "Destiny Angels",
			Author:               "Holy Archangel Sheila",
			Category:             "Faith",
			Description:          "A prophetic word on the record-keeping angels of destiny, the war with Lucifer, Michael the defender, and the coming Book of the Joyful Constellations.",
			Tags:                 []string{"angels", "destiny", "prophecy", "obedience"},
			CoverImage:           ptr("/destiny-angels-cover.png"),
			EstimatedReadingTime: ptr("13 min read"),
			PublishedAt:          ptr("2024-05-12"),
			Chapters: []Chapter{
				{ID: "record-angels", Title: "Destiny Angels Are Record Angels", Content: "Your guardian Angel will never let go."},
			},
		},
		{
			ID:                   "power-of-prayer",
			Title:                "The Power of Prayer",
			Author:               "Princess Vivian Mary Peace",
			Category:             "Prayer",
			Description:          "Prayer changes things. It changes you, it changes others, and it changes the world around you.",
			Tags:                 []string{"prayer", "faith", "devotion"},
			CoverImage:           ptr("https://picsum.photos/seed/njc-lib-power-of-prayer/480/640"),
			EstimatedReadingTime: ptr("12 min read"),
			Featured:             true,
			PublishedAt:          ptr("2024-05-05"),
			Chapters: []Chapter{
				{ID: "introduction", Title: "Introduction", Content: "Prayer is not a last resort for the desperate; it is the first language of the faithful."},
			},
		},
	}
}
