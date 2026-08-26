# How to update the site

Everything is plain Markdown. Edit a file, commit, push — GitHub Pages rebuilds.
To check locally first:

```bash
pip install -r requirements.txt && mkdocs serve
```

---

## Draft notes

Anything showing as a claret-ruled **DRAFT NOTE** on the site is a prompt for you,
not content. Replace it with your own words and delete the `<p class="todo">...</p>`
around it. When they're all gone, the site is done.

---

## Add a recording

Nothing to do here. `docs/Conducting/media.md` embeds the whole YouTube playlist —
add a video to **Conducting Portfolio** on YouTube and it appears on the site by itself.

---

## Add a photo to a gallery

Galleries live in `docs/Physics/gallery.md`, `docs/Conducting/media.md` and
`docs/Conducting/index.md`. Each is one `grid-gallery` block. Drop the image file in
the matching folder (`docs/Physics/media/` or `docs/Conducting/musicphotos/`) and add
one line:

```markdown
![Caption shown in the lightbox](musicphotos/filename.jpg)
```

Delete the line to remove a photo. Order on the page follows order in the list.

Resize anything over ~2000px wide first — big files make the site slow:

```bash
sips -Z 2000 ~/path/to/photo.jpg --out "docs/Conducting/musicphotos/2026-03-curtain-call.jpg"
```

---

## Add an upcoming concert

`docs/Conducting/concerts/index.md`, under `## Upcoming`. There's a commented-out
copy of this block in the file:

```html
<div class="entry" markdown>
<p class="entry-date">Saturday 14 March 2026, 7.30pm</p>
### Royal Holloway String Society — Spring Concert
Picture Gallery, Royal Holloway · Conductor

Vaughan Williams *Fantasia on a Theme by Thomas Tallis* · Akutagawa *Triptyque*

[Tickets](https://example.com)
</div>
```

Soonest first. Once it's happened, move the block down to `## Past concerts` and
swap the ticket link for whatever you have — a YouTube video, an Instagram post,
or nothing:

```markdown
[:fontawesome-brands-youtube: Watch](https://youtu.be/VIDEO_ID) ·
[:fontawesome-brands-instagram: Post](https://www.instagram.com/p/POST_ID/)
```

---

## Add a work to the repertoire

`docs/Conducting/repertoire.md`. Composer on its own line, each work on a line
starting with `:` and three spaces. Keep composers alphabetical — the three columns
fill themselves:

```markdown
Sibelius
:   Symphony No. 2
:   *Finlandia*
```

---

## Add a quote to the homepage

`docs/index.md`, in the `<ul class="rotator">` block. One `<li>` per quote, the
attribution in a `<span>`. They cross-fade automatically; two or more start the
rotation:

```html
<li markdown>
The quotation itself.
<span>Who said it</span>
</li>
```

Change `data-rotate="7000"` to adjust the interval in milliseconds.

---

## Swap the homepage background photo

`docs/index.md`, inside the `hero__bg` block. Any wide photo works — it's rendered
at low opacity behind the text, so busy images are fine.
