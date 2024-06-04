document.addEventListener('DOMContentLoaded', function () {
    AOS.init();
    const projectCount = document.getElementById('project-count');
    const clientCount = document.getElementById('client-count');
    const experienceCount = document.getElementById('experience-count');
  
    let projects = 50;
    let clients = 20;
    let experience = 5;
  
    const counterUp = (el, count) => {
      let current = 0;
      const updateCount = () => {
        if (current < count) {
          current += 1;
          el.innerText = current;
          setTimeout(updateCount, 50);
        } else {
          el.innerText = count;
        }
      };
      updateCount();
    };
  
    counterUp(projectCount, projects);
    counterUp(clientCount, clients);
    counterUp(experienceCount, experience);
  });
  