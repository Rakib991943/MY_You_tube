// This function Is Convberting Value 
const getIime = (time) => {
  const hours = parseInt(time / 3600);
  const remainingSecond = parseInt(time % 3600);
  const minute = parseInt(remainingSecond / 60);
  const second = minute % 60;

  return `${hours} hour ${minute} minute ${second} second `
}

// This Api for BUTTON
const loadCategoris = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
  const data = await res.json();
  showCategories(data.categories)

}
// This API FOR ALL VIdeos
const loadVIdeoCategoris = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
  const data = await res.json();
  showCategoriesVideo(data.videos)


}
// This API FOR one Categories
const load = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}  `);
  const data = await res.json();
  showCategoriesVideo(data.category);
}

// This UI FOr Show Button 
const showCategories = (categories) => {
  const btnContainer = document.getElementById('btnContainer');
  categories.forEach(element => {

    const { category } = element;
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML =

      `
     <button  class='btn' onClick = 'load(${element.category_id})')>
     ${category}
     </button>
    `


    btnContainer.appendChild(buttonContainer);
  });


}

const showCategoriesVideo = (videos) => {
  const videConatainer = document.getElementById('video-section');

  videConatainer.innerHTML = ''
  if (videos.length == 0) {
    videConatainer.innerHTML =
      `
    <div class = 'min-h-[300px] flex flex-col gap-5 justify-center items-center'>
    <img src='Icon.png'/>
    <h2 class='text-3xl'>No Content in this Category</h2>
    </div>
    `
    return;
  }
  videos.forEach(video => {
    // console.log(video);
    const { thumbnail } = video;
    const div = document.createElement('div');
    div.classList = 'videos'
    div.innerHTML = `
    <div class="card card-compact bg-base-100 w-96 shadow-xl">
  <figure class ='h-[200px] ' >
    <img class = 'h-full w-full object-cover'
      src=${thumbnail}
      alt="Shoes" /> 
     
       ${video.others.posted_date?.length == 0 ? "" : ` <spain class = 'absolute right-0 text-white font-bold bottom-5'>
       ${getIime(video.others.posted_date)}
      </spain>`}
    
  </figure>
  
  
</div>
<div class="px-0 py-2 flex">

    <div class='h-[70px] w-[70px]'> 
    <img class=' w-full h-full rounded-full object-cover' src=${video.authors[0].profile_picture} alt =  '' />
    
    </div>

    <div class = >
    <h2 class = 'font-bold ml-3'>${video.title}</h2>
    <div class = 'flex justify-center'>
 
    <p class='ml-3 mt-2'> ${video.authors[0].profile_name}</p>
   
    <div class='w-[30px] mt-2 ml-1'>
   ${video.authors[0].verified == true ? `<img class='w-full ' src = 'https://img.icons8.com/?size=96&id=63262&format=png'  />` : 'False'} 
    </div>
   </div>
   <h3 class = 'font-bold ml-4'>${video.others.views}</h3>
    <div/>
    
  </div>
    `
    videConatainer.append(div);
  })
}
loadCategoris();
loadVIdeoCategoris();