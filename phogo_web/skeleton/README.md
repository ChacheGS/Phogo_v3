## Phogo Web

This is the website served by the robot, to control the robot.

In order to run this project, for development purposes, you need node 20 (lts/iron) and python 3.12 for the `dev_server` part.

If you have a real robot, that's a lot better.

The full toolchain to make a Phogo image ready to burn is yet to be made.

### Build it

This project is based on [SvelteKit](https://kit.svelte.dev) and [Skeleton.dev](https://skeleton.dev).

The output of `npm run build` is a static site that can be embedded in the robot... if it fits, which I'm not sure yet.

### Improve it

Run `npm install`, then `npm run dev` and check [http://localhost:5173](http://localhost:5173)
