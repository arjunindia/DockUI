package main

import (
	"context"
	"net/http"
	"os"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"

	"DockUI/docker"
	"DockUI/frontend"
)

func main() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()

	dockerCli := docker.NewDocker()
	defer dockerCli.Close()
	dockerCli.PullImage("alpine")
	_, err = dockerCli.ListImages()
	if err != nil {
		panic(err)
	}
	dockerCli.ListContainers()

	resp, err := cli.ContainerCreate(ctx, &container.Config{
		Image: "alpine",
		Cmd:   []string{"echo", "hello world"},
	}, &container.HostConfig{}, nil, nil, "")
	if err != nil {
		panic(err)
	}

	dockerCli.StartContainer(resp.ID)

	statusCh, errCh := cli.ContainerWait(ctx, resp.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errCh:
		if err != nil {
			panic(err)
		}
	case <-statusCh:

	}

	out, err := cli.ContainerLogs(ctx, resp.ID, container.LogsOptions{ShowStdout: true})
	if err != nil {
		panic(err)
	}

	stdcopy.StdCopy(os.Stdout, os.Stderr, out)
	http.Handle("/", http.FileServer(frontend.BuildHTTPFS()))
	http.ListenAndServe(":8081", nil)
}
