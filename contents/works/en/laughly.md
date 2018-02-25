---
title: Laughly
year: 2018
owner: Laughly, Inc.
role: UX/UI Design
related:
  - weekend-creator
  - libz-career
  - wonolo
colors:
  - #fdde0e
  - #373737
  - #717171
  - #247885
  - #484848
  - #252525
  - #C23535
description: |
  Laughly is an audio-based comedy streaming app. They aim to become a platform that creates and promotes comedic brands at an individual or organizational level. They desired to integrate both audio and video formats into the app, and to bring the audience and comedian together to create a social community. I tackled designing the new channel page structure and led the design team through high-fidelity and prototyping.
---

![laughly_01.jpg](https://user-images.githubusercontent.com/818309/36591917-6a5ef880-1848-11e8-98dd-8e4520d0b257.jpg)

## User Insight

We kicked off the project by interviewing people who use Laughly or love comedy. Users said that if Laughly started providing video content, they would gladly watch. Users also told us that they usually listened to the audio in the background while performing other actions such as while driving during their commute.

![laughly_02.jpg](https://user-images.githubusercontent.com/818309/36506171-a1af8988-170a-11e8-9f12-7e23172a3fb3.jpg)
*Issue: How can users switch between consuming video and audio easily?*

## Channel Navigation

![laughly_03.jpg](https://user-images.githubusercontent.com/818309/36506273-009470d0-170b-11e8-8753-fcc7522b4886.jpg)

On top of video, Laughly has several types of other content to keep in mind which include albums, podcasts, playlists. My design focused on how to organize the different type of contents to cater to an audience.
I designed and iterated channel navigation. The design decision was prioritizing to separate types of content into ALL, AUDIO and VIDEO based on the user insight.

Ver1: The initial design was to align with all type of contents, but that made it harder to navigated between the two content types

Ver2: Added filter feature instead, but this design for the filtering might not scale well in the future.

Ver3: Changed filter UI, and tested it for usability. Users felt the filter option was inconspicuous and some users thought this filter button was a search box.

Ver4: The final design, modified the filter button.

## Thumbnail

![laughly_04.jpg](https://user-images.githubusercontent.com/818309/36506280-0556a8b8-170b-11e8-8014-4ab2ea901f61.jpg)

Audio and video formats had to be distinguished for combining these on one screen. The critical difference between audio and video formats is the ratio of the thumbnail image size, and the presence of a play button.

## Reviews

[laughly_05.mp4]

Users were confused by the comment feature on the channel page. Was it for the artist? The content itself?
So I changed the label Comment to Review. By moving it to the deepest content page such as the album, playlist, and media player, I clarified what the user was writing a review for.

In a media player, the review feature shows up at the half of screen to read reviews during watching album cover or video without transition.


### Review button

![laughly_06.jpg](https://user-images.githubusercontent.com/818309/36506283-07ccdacc-170b-11e8-95f1-1bed799b32ba.jpg)

Users found that the Write Review button was too hidden, which would deter them from engaging with it without being prompted. I moved the Write Review button to next to the rating on the playlist page. This made the button easier to find, and allowed users to go directly to the review page to write.

## Design System

![laughly_07.png](https://user-images.githubusercontent.com/818309/36506286-0a87eb8a-170b-11e8-97c8-3f93e9250f7a.png)

I focused on mainly UI design, worked in Sketch, made the design system and bunch of components to allow 8 designers to design consistently.

### Sketch symbol

![laughly_08.png](https://user-images.githubusercontent.com/818309/36506357-40fbb52a-170b-11e8-93b4-0ddcf592ecc5.png)

We had to make a lot of screens and iterate it frequently to validate usability. My challenge was making Sketch symbols that other designers can override the symbol easily and efficiently.
