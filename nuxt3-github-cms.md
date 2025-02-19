# Using TACo CMS (Markdown in GitHub)

This guide explains how to create and edit blog posts using TACo CMS, which uses GitHub as the content management system with Markdown files.

## Project Structure
```
your-project/
├── content/
│   └── posts/
│       └── post_1.md
├── public/
│   └── images/
│       ├── post-banner/
│       │   └── skyline-banner.jpg
│       └── post-images/
│           ├── 1.jpg
│           └── 2.jpg
└── pages/
    └── [...slug].vue
```

Understanding this structure:
- All blog posts go in `content/posts/`
- Banner images go in `public/images/post-banner/`
- Post images go in `public/images/post-images/`

## Creating a New Post

1. Navigate to the `content/posts` folder in the GitHub repository
2. Click the "Add file" button and select "Create new file"
3. Name your file with the format: `your-post-title.md` (use hyphens for spaces)

## Post Template

Copy and paste this template into your new file:

```markdown
---
title: Your Post Title
description: Brief description of your post
date: YYYY-MM-DD
time: H:MM(AM/PM)
bannerimage: /images/post-banner/your-banner-image.jpg
tags:
  - Tag1
  - Tag2
---

# Your Post Title

Your content goes here...

![Image Description](/images/post-images/your-image.jpg)
*Image Caption*
```

## Writing Your Post

1. **Required Header Section**
   - Between the `---` markers at the top
   - Fill in all fields:
     - `title`: Your post title
     - `description`: Brief summary
     - `date`: Format YYYY-MM-DD
     - `time`: Format H:MM(AM/PM)
     - `bannerimage`: Path to banner image
     - `tags`: List relevant tags

2. **Main Content**
   - Write your content using Markdown
   - Headers start with #
   - **Bold** text uses `**text**`
   - *Italic* text uses `*text*`
   - Links use `[text](url)`

3. **Adding Images**
   - Format: `![Alt Text](/images/post-images/filename.jpg)`
   - Add caption below: `*Caption text*`
   - Image paths must start with `/images/`

## Adding Images

1. For post images:
   - Navigate to `public/images/post-images` folder
   - Click "Add file" → "Upload files"
   - Use path: `/images/post-images/your-image.jpg`

2. For banner images:
   - Navigate to `public/images/post-banner` folder
   - Click "Add file" → "Upload files"
   - Use path: `/images/post-banner/your-banner.jpg`

## Saving Your Post

1. Scroll to bottom of the editor
2. Add a commit message (e.g., "Add new post: Post Title")
3. Select "Commit directly to the main branch"
4. Click "Commit new file"

## Editing Existing Posts

1. Navigate to the post's .md file
2. Click the pencil icon (Edit)
3. Make your changes
4. Scroll down and click "Commit changes"

## Tips for Good Posts

1. **Images**
   - Use clear, high-quality images
   - Always add descriptive captions
   - Keep image files under 5MB
   - Banner images should be landscape orientation

2. **Writing**
   - Use short paragraphs
   - Include descriptive image alt text
   - Break up text with images
   - Use headers to organize content

3. **Metadata**
   - Choose relevant tags
   - Write clear descriptions
   - Use accurate dates and times

## Example Post

```markdown
---
title: When you die, self custody becomes meaningless
description: Exploring the implications of digital asset inheritance
date: 2024-02-11
time: 5:00PM
bannerimage: /images/post-banner/skyline-banner.jpg
tags:
  - TACo
  - BqETH
---

# When you die, self custody becomes meaningless

Your introduction paragraph goes here...

![Geometric Glass Building](/images/post-images/1.jpg)
*Modern architecture emphasizes transparency and light*

The interplay between light and glass creates ever-changing patterns 
throughout the day. Modern architects have mastered the art of using 
natural light to enhance their designs.

![Interior Atrium](/images/post-images/2.jpg)
*Natural light floods the central atrium, creating dynamic shadows*

Your concluding thoughts go here...
```
