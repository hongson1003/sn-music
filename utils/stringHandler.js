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

export const formatDuration = (duration) => {
  if (duration >= 60) {
    const minutes = Math.floor(duration / 60); // Lấy phần nguyên của phút
    const seconds = duration % 60; // Lấy phần dư là giây
    // Nếu số giây bằng 0, chỉ hiển thị phút mà không cần "0s"
    return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`;
  }
  return `${duration}s`; // Nếu dưới 60 giây thì hiển thị giây
};
