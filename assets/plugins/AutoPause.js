class AutoPause {
  constructor() {
    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  run(player) {
    this.player = player;

    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    });

    observer.observe(this.player.media);

    document.addEventListener("visibilitychange", this.handleVisibilityChange)
  
  }
  //Esta parte sirve cuando hacemos scroll y dejamos de ver el video hasta el umbral minimo marcado
  handleIntersection(entries) {
    const entry = entries[0];

    const isVisible = entry.intersectionRatio >= this.threshold;

    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  //Esta parte sirve cuando cambiamos de pestaña
  handleVisibilityChange(){
    const isVisible = document.visibilityState === "visible"
    if (isVisible){
      this.player.play()
    }else{
      this.player.pause()
    }
  }
}

export default AutoPause;
