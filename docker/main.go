package docker

import (
	"context"
	"os"
	"strings"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
)

type Docker struct {
	cli *client.Client
}

func NewDocker() *Docker {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	return &Docker{cli: cli}
}

func (d *Docker) Close() {
	d.cli.Close()
}

func (d *Docker) PullImage(img string) error {
	reader, err := d.cli.ImagePull(context.Background(), img, image.PullOptions{})
	if err != nil {
		return err
	}
	_, err = stdcopy.StdCopy(os.Stdout, os.Stderr, reader)
	if err != nil {
		return err
	}
	return nil
}

func (d *Docker) RemoveImage(imgID string) error {
	resp, err := d.cli.ImageRemove(context.Background(), imgID, image.RemoveOptions{})
	if err != nil {
		return err
	}
	println(resp[0].Deleted, " image deleted")
	return nil
}

func (d *Docker) ListImages() error {
	list, err := d.cli.ImageList(context.Background(), image.ListOptions{})
	if err != nil {
		return err
	}
	for _, image := range list {
		println(strings.Join(image.RepoTags, " "))
	}
	return nil
}

func (d *Docker) ListContainers() error {
	list, err := d.cli.ContainerList(context.Background(), container.ListOptions{})
	if err != nil {
		return err
	}
	for _, container := range list {
		println(strings.Join(container.Names, " "))
	}
	return nil
}

func (d *Docker) RemoveContainer(containerID string) error {
	return d.cli.ContainerRemove(context.Background(), containerID, container.RemoveOptions{})
}
func (d *Docker) StartContainer(containerID string) error {
	return d.cli.ContainerStart(context.Background(), containerID, container.StartOptions{})
}

func (d *Docker) StopContainer(containerID string) error {
	return d.cli.ContainerStop(context.Background(), containerID, container.StopOptions{})
}

func (d *Docker) RestartContainer(containerID string) error {
	return d.cli.ContainerRestart(context.Background(), containerID, container.StopOptions{})
}

func (d *Docker) KillContainer(containerID string) error {
	return d.cli.ContainerKill(context.Background(), containerID, "KILL")
}

func (d *Docker) PauseContainer(containerID string) error {
	return d.cli.ContainerPause(context.Background(), containerID)
}

func (d *Docker) UnpauseContainer(containerID string) error {
	return d.cli.ContainerUnpause(context.Background(), containerID)
}
