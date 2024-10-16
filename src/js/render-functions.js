function createGallery(photos) { 
  const gallery = document.createElement('ul');
  for (const imgData of photos) { 
    const li = document.createElement('li');
    li.classList.add("gallery-item");
  
    const img = document.createElement('img');
    img.classList.add("gallery-image");
    img.setAttribute('src', imgData.webformatURL);
    img.setAttribute('alt', imgData.tags);
  
    const a = document.createElement('a');
    a.classList.add('gallery-link')
    a.setAttribute('href', imgData.largeImageURL);
    a.append(img);

    li.append(a);

    const desc = document.createElement('div');
    desc.classList.add("gallery-descr");

    const likes = document.createElement('div');
    likes.innerHTML = `<span>Likes</span>${imgData.likes}`;
    desc.append(likes);
    const views = document.createElement('div');
    views.innerHTML = `<span>Views</span>${imgData.views}`;
    desc.append(views);
    const comment = document.createElement('div');
    comment.innerHTML = `<span>Comments</span>${imgData.comments}`;
    desc.append(comment);
    const download = document.createElement('div');
    download.innerHTML = `<span>Downloads</span>${imgData.downloads}`;
    desc.append(download);

    li.append(desc);

    gallery.append(li);
  }
  return gallery.innerHTML;
}

export { createGallery }
