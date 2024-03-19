import { createClient, groq } from "next-sanity";
import clientConfig from "./sanity-client-config";
import { Profile } from "../types/Profile"

export async function getLatestProjects() {
	return createClient(clientConfig).fetch(
		groq`*[_type == "projects"] | order(createdAt desc)[0..2] {
			_id,
			createdAt,
			title,
			description,
			"images": images[]{
			  asset->{
				_id,
				_createdAt,
				url
			  }
			},
			repoUrl,
			liveUrl,
			hidden,
			stacks
		}`
	)
}

export async function getProjects() {
	return createClient(clientConfig).fetch(
		groq`*[_type == "projects"] | order(createdAt desc) {
			_id,
			createdAt,
			title,
			description,
			"images": images[]{
				asset->{
					_id,
					_createdAt,
					url
				}
			},
			repoUrl,
			liveUrl,
			hidden,
			stacks
		}`
	)
}

export async function getProfile(): Promise<Profile[]> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "profile"] {
			_id,
			introduction,
			me,
			changing_texts,
			arrow_color,
			timeline,
			technologies,
			email,
			github,
			linkedin,
			fullstack_filter
		}`
	);
}