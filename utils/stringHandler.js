export const getImage = (fileId, width, height) => {
  if (fileId.includes("google")) return fileId;
  const url = `https://lh3.googleusercontent.com/d/${fileId}`;
  if (width && height) {
    return `${url}=w${width}-h${height}-c`;
  } else if (width) {
    return `${url}=w${width}`;
  } else if (height) {
    return `${url}=h${height}`;
  } else {
    return url;
  }
};

export const getVideo = (fileId) => {
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

export const getFile = (fileId) => {
  return `https://docs.google.com/viewer?srcid=${fileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`;
};

export const getDriveDownloadUrl = (fileId) =>
  `https://drive.google.com/uc?export=download&id=${fileId}`;
