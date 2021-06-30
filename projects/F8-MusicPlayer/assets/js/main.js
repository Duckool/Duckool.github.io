const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Element
const player = $('.player')
const playList = $('.playlist')
const btnTogglePlay = $('.control .btn-toggle-play')
const btnNext = $('.control .btn-next')
const btnPrev = $('.control .btn-prev')
const btnRepeat = $('.control .btn-repeat')
const btnRandom = $('.control .btn-random')
const songPlayingName = $('header h2')
const cd = $('.cd')
const cdWidth = cd.offsetWidth
const cdThumb = $('.cd .cd-thumb')
const progress = $('#progress')
const cdThumbAnimation = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
  duration: 7000, // 10s
  iterations: Infinity
})
var audio = $('#audio')

// APP
const app = {
    //  Database --> Get by Json

    songs: [
        {
          name: "BMAGER",
          singer: "Khoi Vu",
          path: "http://vnso-zn-5-tf-mp3-s1-zmp3.zadn.vn/f6b035d1609689c8d087/166512964012506837?authen=exp=1621776390~acl=/f6b035d1609689c8d087/*~hmac=2ddcc9862bec92f9ec4c0bcda32020d9",
          image: "https://i.ytimg.com/vi/cDJpEwUif3U/maxresdefault.jpg"
        },
        {
          name: "Cho mình em",
          singer: "Binz x Đen",
          path: "http://vnso-zn-24-tf-mp3-s1-zmp3.zadn.vn/642e0cefc1a828f671b9/8647745914719221858?authen=exp=1621740964~acl=/642e0cefc1a828f671b9/*~hmac=051a83491e88d666d20f246bd6f2830d",
          image:
            "https://static.yeah1.com/uploads/editors/12/2021/03/26/TZ6u5fNwHAKcqAc7XOkh4jQLt3MfoZKE6ltdgTVI.png"
        },
        {
          name: "Cách xa một màn hình",
          singer: "Mit x Carterpham x Ducpham",
          path: "http://mp3-s1-zmp3.zadn.vn/72c93ac55682bfdce693/7208706465051256851?authen=exp=1621776521~acl=/72c93ac55682bfdce693/*~hmac=15c3237069ea8ce067dfe8972a490f6c",
          image: "https://64.media.tumblr.com/801969335a3b97bc38fd8860c66e874a/tumblr_nzpv2brLvv1uzjthio1_540.gifv"
        },
        {
          name: "Răng khôn",
          singer: "Phí Phương Anh",
          path: "http://vnso-zn-24-tf-mp3-s1-zmp3.zadn.vn/a2e92a371e71f72fae60/1885276178088752158?authen=exp=1621569528~acl=/a2e92a371e71f72fae60/*~hmac=c74f759859ac44ab65d5b48c53eac717",
          image: "https://i.ytimg.com/vi/Orv_t0KgEB8/maxresdefault.jpg"
        },
        {
          name: "To the Moon",
          singer: "hooligan",
          path: "http://vnso-zn-5-tf-mp3-s1-zmp3.zadn.vn/415eb194bdd3548d0dc2/3062584480359042613?authen=exp=1621867524~acl=/415eb194bdd3548d0dc2/*~hmac=ab6475b27f448b31cfb5299bbd028474",
          image:
            "https://i.ytimg.com/vi/nmKTlmByng0/maxresdefault.jpg"
        },
        {
          name: `Build a B*tch`,
          singer: "Bella Poarch",
          path: "http://mp3-s1-zmp3.zadn.vn/3b3cc360e82601785837/1115295542287160447?authen=exp=1621780420~acl=/3b3cc360e82601785837/*~hmac=8ec3bc8081acf176a731dd8f43b4db93",
          image: "https://i.ytimg.com/vi/vd0Wng9aqtc/maxresdefault.jpg"
        },
        {
          name: "Thở",
          singer: "DaLAB x Juky San",
          path: "http://vnso-zn-16-tf-mp3-s1-zmp3.zadn.vn/e7d50099c7de2e8077cf/5966541326435079144?authen=exp=1621867841~acl=/e7d50099c7de2e8077cf/*~hmac=660c2c34602f9e342d4b31ddb8b32fae",
          image: "https://i.ytimg.com/vi/pISLmTTklmQ/maxresdefault.jpg"
        },
        {
          name: "Play Date",
          singer: "Melanie Martinez",
          path: "http://vnso-zn-15-tf-mp3-s1-zmp3.zadn.vn/e3f21bea20acc9f290bd/8999310565620773738?authen=exp=1621840709~acl=/e3f21bea20acc9f290bd/*~hmac=9addc61eb1980b06d7d4b7dbf37f81a2",
          image:
            "https://i.ytimg.com/vi/rYnU-EHyZQU/maxresdefault.jpg"
        },
        {
          name: "Đường tôi chở em về",
          singer: "buitruonglinh",
          path: "http://vnso-zn-15-tf-mp3-s1-zmp3.zadn.vn/702f1c9a06ddef83b6cc/8946366593488411848?authen=exp=1621867683~acl=/702f1c9a06ddef83b6cc/*~hmac=937e8c3ccb37e1d2d6aa854a9d036d47",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        }
      ],
    
    currentSongIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,

    updateAudio: function(index = this.currentSongIndex){
        audio.src = this.songs[index].path
        app.handleEvents()
        app.updatePlayInterface()
    },

    // UI Playing
    updatePlayInterface: function(index = this.currentSongIndex){
        songPlayingName.innerText = this.songs[index].name
        cdThumb.style.backgroundImage = `url(${this.songs[index].image})`

        
        // CSS for Song Playing
        var songPlaying = $('.song.active');
        if(songPlaying) songPlaying.classList.remove('active')

        songPlaying = $(`[data-index="${index}"]`)
        songPlaying.classList.add('active')
    },

    // Play / Pause / Next
    playing: function(){
      audio.pause()

      app.updateAudio()

      audio.play()
    },

    // Get Next/Prev Song Index
    prevSong: function(index = this.currentSongIndex) {
      return index - 1 >= 0 ? index - 1 : this.songs.length-1
    },

    nextSong: function(index = this.currentSongIndex) {
      return index + 1 < this.songs.length ? index + 1 : 0
    },

    // RENDER
    render: function() {
        const htmls = this.songs.map( (song,index) => `
        <div class="song" data-index='${index}'>
            <div class="thumb" style="background-image: url(${song.image})">
            </div>
            <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
            </div>
            <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            </div>
         </div>`)

         const html = htmls.join('')

         playList.innerHTML = html
    },
    
    // Handle Events
    handleEvents: function() {
      document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const cdNewWidth = cdWidth - scrollTop

        cd.style.width = (cdNewWidth > 0 ? cdNewWidth : 0) + 'px'
        cd.style.opacity = cdNewWidth/cdWidth
    }


    btnTogglePlay.onclick = function() {
      
      if(!app.isPlaying) audio.play()
      else audio.pause()
    }

      audio.onplay = function() {
        app.isPlaying = true
        player.classList.add('playing')

        // app.updatePlayInterface()
        cdThumbAnimation.play()
      }
      audio.onpause = function() {
        app.isPlaying = false
        player.classList.remove('playing')  

        cdThumbAnimation.pause()
      }

      //  Next Song
      btnNext.onclick = function() {
        if(app.isRandom){
          // Random song != songs[index]
          let index;
          do{
            index = Math.floor(Math.random() * app.songs.length)
          } while(index===app.currentSongIndex)

          // update current-song-index
          app.currentSongIndex = index
        }else app.currentSongIndex = app.nextSong()

        app.playing()
      }

      // Prev Song
      btnPrev.onclick = function() {
        app.currentSongIndex = app.prevSong()
        app.playing(app.prevSong())
      }

      // Select Song
      const songElements = [...$$('.song')]

      songElements.forEach( (songElement,index) => {
        songElement.onclick = function(e) {
          app.currentSongIndex = songElement.dataset.index
          app.playing()
        }
      })

      // Point Time Running
      audio.ontimeupdate = function() {
        const songDuration = audio.duration
        const currentTime = audio.currentTime
        const timePoint = songDuration ? currentTime*100/songDuration : 0
        
        progress.value = timePoint
      }

      // SeekTime Song
      progress.onchange = function() {
        const songDuration = audio.duration
        const percentSeek = progress.value / 100
        const timeSeek = percentSeek * audio.duration
        
        audio.currentTime = timeSeek
      }
      // Audio ended
      audio.onended = function() {
        if(app.isRepeat) audio.play()
        else btnNext.click()
      }

      // Next Song State
      btnRepeat.onclick = function() {
        app.isRepeat = !app.isRepeat
        btnRepeat.classList.toggle('active',app.isRepeat)
      }

      btnRandom.onclick = function() {
        app.isRandom = !app.isRandom
        btnRandom.classList.toggle('active',app.isRandom)
      }
    },

    // START APP
    start: function() {
        this.render()
        this.playing()
    }
}

app.start()

function show(...list) {
  for(var x of list) console.log(x)
}