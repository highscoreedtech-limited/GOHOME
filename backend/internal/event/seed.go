package event

// seed mirrors the frontend's data/calendar.ts. Replace with a DB later.
func seed() []Event {
	return []Event{
		{
			ID:          "weekly-prayer",
			Title:       "Weekly Prayer Meeting",
			Category:    "Prayer",
			Weekday:     ptr(6), // Saturday
			Time:        ptr("6:00 AM"),
			Location:    ptr("New Jerusalem Prayer Hall, Enugu"),
			Description: ptr("Our weekly gathering for prayer and intercession, held every Saturday morning."),
		},
		{
			ID:          "weekly-adoration",
			Title:       "Weekly Adoration",
			Category:    "Worship",
			Weekday:     ptr(4), // Thursday
			Time:        ptr("5:00 PM"),
			Location:    ptr("New Jerusalem City Center, Enugu"),
			Description: ptr("A quiet hour of adoration before the Blessed Sacrament every Thursday evening."),
		},
		{
			ID:          "mercy-outreach-sep",
			Title:       "Mercy Outreach",
			Category:    "Outreach",
			Date:        ptr("2026-09-12"),
			Time:        ptr("9:00 AM"),
			Location:    ptr("Enugu Community"),
			Description: ptr("Corporal works of mercy: sharing food, clothing, and care with the less privileged."),
		},
		{
			ID:          "november-novena",
			Title:       "November Novena",
			Category:    "Novena",
			Start:       ptr("2026-11-01"),
			End:         ptr("2026-11-09"),
			Time:        ptr("6:00 AM"),
			Location:    ptr("New Jerusalem Prayer Hall, Enugu"),
			Description: ptr("The biannual novena: nine days of prayer from the 1st to the 9th of November."),
		},
		{
			ID:          "feast-holy-family",
			Title:       "Grand Finale: Feast of the Holy Family",
			Category:    "Feast",
			Date:        ptr("2026-11-15"),
			Time:        ptr("10:00 AM"),
			Location:    ptr("New Jerusalem City Center, Enugu"),
			Description: ptr("The grand finale of the November Novena, followed by an outreach to the less privileged."),
		},
	}
}
