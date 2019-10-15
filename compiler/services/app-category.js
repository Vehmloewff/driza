const categories = [
	"business",
	"developer-tools",
	"education",
	"entertainment",
	"finance",
	"games",
	"graphics-design",
	"healthcare-fitness",
	"lifestyle",
	"medical",
	"music",
	"news",
	"photography",
	"productivity",
	"reference",
	"social-networking",
	"sports",
	"travel",
	"utilities",
	"video",
	"weather",
	"system",
	"settings",
]

const macResolves = {
	"business": "public.app-category.business",
	"developer-tools": "public.app-category.developer-tools",
	"education": "public.app-category.education",
	"entertainment": "public.app-category.entertainment",
	"finance": "public.app-category.finance",
	"games": "public.app-category.games",
	"graphics-design": "public.app-category.graphics-design",
	"healthcare-fitness": "public.app-category.healthcare-fitness",
	"lifestyle": "public.app-category.lifestyle",
	"medical": "public.app-category.medical",
	"music": "public.app-category.music",
	"news": "public.app-category.news",
	"photography": "public.app-category.photography",
	"productivity": "public.app-category.productivity",
	"reference": "public.app-category.reference",
	"social-networking": "public.app-category.social-networking",
	"sports": "public.app-category.sports",
	"travel": "public.app-category.travel",
	"utilities": "public.app-category.utilities",
	"video": "public.app-category.video",
	"weather": "public.app-category.weather",
	"system": "public.app-category.utilities",
	"settings": "public.app-category.utilities",
}

const linuxResolves = {
	"business": "Office",
	"developer-tools": "Development",
	"education": "Education",
	"entertainment": "Entertainment",
	"finance": "Finance",
	"games": "Game",
	"graphics-design": "Graphics",
	"healthcare-fitness": "Health",
	"lifestyle": "Lifestyle",
	"medical": "Medical",
	"music": "Music",
	"news": "News",
	"photography": "Sports",
	"productivity": "Productivity",
	"reference": "Rreference",
	"social-networking": "Network",
	"sports": "Sports",
	"travel": "Travel",
	"utilities": "Utility",
	"video": "AudioVideo",
	"weather": "Network",
	"system": "System",
	"settings": "Settings",
}

module.exports = category => {
	const linux = linuxResolves[category];
	const mac = macResolves[category];

	if (!linux || !mac) {
		let validCategoriesString = ``;

		categories.forEach(cat => {
			validCategoriesString += `${cat}\n`;
		})

		throw new Error(`Invalid category "${category}".  Valid categories are:\n${validCategoriesString}`)
	}

	return {
		linux,
		mac,
	}
}