(
    function() {
      function addProjects(json) {
        let projects = document.querySelector('.projects');
  
        for(let project of json) {
          let projectElement = document.createElement('article');
          let overlay = document.createElement('div');
          let title = document.createElement('p');
          let image = document.createElement('img');
  
          projectElement.classList.add('project');
          overlay.classList.add('overlay');
          title.classList.add('overlay-title');
          title.innerText = project.title;
  
          image.setAttribute('src',project.cover);
          image.setAttribute('alt',project.title);
  
          overlay.appendChild(title);
          overlay.onclick = () => showModal(project);
  
          projectElement.appendChild(overlay);
          projectElement.appendChild(image);
  
          projects.appendChild(projectElement);
  
          projectElement.addEventListener('mouseover', function() {this.classList.add('hover')});
          projectElement.addEventListener('mouseout', function() {this.classList.remove('hover')});
        }
      }
  
      function showModal(project) {
        let modal = document.getElementById('modal');
  
        modal.classList.add('show');
        document.getElementById('modal-overlay').classList.add('show');
        document.querySelector('#modal .modal-title').innerText = project.title;
        document.querySelector('#modal .modal-description').innerText = project.description;
  
        for(let media of project.media) {
          let mediaType = media.split("/")[0];
          let mediaElement;
          if(mediaType === 'images') {
            mediaElement = `<img src="${media}"/>`;
          } else if(mediaType === 'videos') {
            mediaElement = `<video src="${media}" autoplay muted></video>`
          }
          document.querySelector('#modal .cover-wrapper').innerHTML += `<a data-fslightbox="first-lightbox" href="${media}" onclick="fsLightbox.open()">${mediaElement}</a>`;
        }
  
        refreshFsLightbox();
  
        if(project.link) {
          document.querySelector('.modal-link').style.display = "block";
          document.querySelector('.modal-link-title').style.display = "block";
          document.querySelector('.modal-link').innerHTML = `<a href=${project.link} target="_blank" rel="noreferrer">${project.title}</a>`;
        } else {
          document.querySelector('.modal-link').style.display = "none";
          document.querySelector('.modal-link-title').style.display = "none";
          document.querySelector('.modal-link').innerHTML = "";
        }
  
        document.querySelector('.team-title').style.display = "none";
        document.querySelector('#modal .modal-team').innerHTML = "";
  
        document.querySelector('#modal .software').innerHTML = "";

        let softwareElement = document.createElement('ul');
        for(let software of project.software) {
          softwareElement.innerText += `<li>${software}</li>`;
        }
        
        softwareElement.innerHTML = softwareElement.innerText;
        document.querySelector('#modal .software').appendChild(softwareElement);
      }
  
      document.getElementById('modal-overlay').onclick = () => {
        document.getElementById('modal').classList.remove('show');
        document.getElementById('modal-overlay').classList.remove('show');
        document.querySelector('#modal .modal-team').innerHTML = "";
        document.querySelector('#modal .cover-wrapper').innerHTML = "";
      };
  
      fetch('data/projects.json').then(response => response.json()).then(data => addProjects(data));
  
      let headroom  = new Headroom(document.querySelector('#header'));
      headroom.init();
    }
  )();