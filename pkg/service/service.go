package service

var localPodService = &podService{}
var localChatService = &chatService{}
var localNodeService = &nodeService{}
var localDeploymentService = &deployService{}
var localClusterService = &clusterService{
	clusterConfigs:        []*ClusterConfig{},
	AggregateDelaySeconds: 61, // 没有秒级支持，所以大于1分钟
}
var localStorageClassService = &storageClassService{}

func ChatService() *chatService {
	return localChatService
}
func DeploymentService() *deployService {
	return localDeploymentService
}
func PodService() *podService {
	return localPodService
}
func NodeService() *nodeService {
	return localNodeService
}
func ClusterService() *clusterService {
	return localClusterService
}
func StorageClassService() *storageClassService {
	return localStorageClassService
}
