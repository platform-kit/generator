<div align="center" style="background:#fff;border-radius:5px;padding:10px 10px 5px 10px;margin-top:20px;">
    <h1 style="margin-bottom:15px;margin-top:10px; border:none;font-weight:100;color:#000 !important;">Directory Structure</span></h1>
</div>

- `root`
    - the `bin` directory contains **executable binaries**.
    - the `data` directory contains **markdown** and **JSON** files.
    - the `dist` directory contains **generated html** files.
    - the `functions` directory contains **serverless functions**.
    - the `lib` directory contains **utility classes**.
    - the `prototypes` directory contains **markdown** and **JSON** prototype files.
    - the `scripts` directory contains **build scripts**.
    - the `src` directory contains **Vue components**.
        - `src/assets`: **static files** which will be available to the site builder via [GraphQL](https://gridsome.org/docs/images/) in Gridsome
        - `src/commands`: **javascript files** in this folder are [OCLIF](https://oclif.io/docs/) commands which can be run via the command line with `./bin/run {commandName}` 
        - `src/components`: **.vue files** in this folder represent [Gridsome Components](https://gridsome.org/docs/components/)
        - `src/layouts`: **.vue files** in this folder represent [Gridsome Layouts](https://gridsome.org/docs/layouts/)
        - `src/pages`: **.vue files** in this folder represent [Gridsome Pages](https://gridsome.org/docs/pages/)
        - `src/templates`: **.vue files** in this folder represent [Gridsome Templates](https://gridsome.org/docs/templates/)
    - the `static` directory contains **static html & assets**.
    - the `workspace` directory contains the **remote git repository**.