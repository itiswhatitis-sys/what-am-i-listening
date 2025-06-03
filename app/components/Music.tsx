export default function MusicCard () {
    return(

        <>
      <section className="max-w-3xl  mx-auto mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
  <div className="bg-gradient-to-r bg-purple-900/70 to-violet-900/70 backdrop-blur-md rounded-xl  shadow-lg p-6 flex gap-4">
    
    {/* Album Cover */}
    <img
      src="/album.jpg"
      alt="Album cover"
      className="w-28 h-28 rounded-md object-cover"
    />

    {/* Song Info + Controls */}
    <div className="flex-1 text-white">
      <p className="uppercase text-sm opacity-70">Utopia</p>
      <p className="text-sm opacity-70">Travis Scott, Playboi Carti</p>
      <h3 className="text-xl font-semibold mt-1">FE!N (feat. Playboi Carti)</h3>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/30 mt-2 rounded-full">
        <div className="h-1 bg-white w-1/6 rounded-full"></div>
      </div>
      <div className="flex justify-between text-xs opacity-50 mt-1">
        <span>0:02</span>
        <span>0:30</span>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-4 text-xl">
        <button>⟲</button>
        <button>⏮</button>
        <button className="bg-white/20 rounded-full p-2 shadow-inner">▶️</button>
        <button>⏭</button>
        <button>🔀</button>
      </div>
    </div>
  </div>
</section>
        </>
    );
}