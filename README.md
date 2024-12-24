## **k8m**
[English](README_en.md) | [中文](README.md)

[![k8m](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](https://github.com/weibaohui/k8m/blob/master/LICENSE)

**k8m** 是一款AI驱动的 Mini Kubernetes AI Dashboard 轻量级控制台工具，专为简化集群管理设计。它基于 AMIS 构建，并通过  [`kom`](https://github.com/weibaohui/kom)  作为 Kubernetes API 客户端，**k8m** 内置了 Qwen2.5-Coder-7B 模型交互能力，同时支持接入您自己的私有化大模型。

### 主要特点
- **迷你化设计**：所有功能整合在一个单一的可执行文件中，部署便捷，使用简单。
- **简便易用**：友好的用户界面和直观的操作流程，让 Kubernetes 管理更加轻松。
- **高效性能**：后端采用 Golang 构建，前端基于百度 AMIS，保证资源利用率高、响应速度快。
- **Pod 文件管理**：支持 Pod 内文件的浏览、编辑、上传、下载、删除，简化日常操作。
- **Pod 运行管理**：支持实时查看 Pod 日志，下载日志，并在 Pod 内直接执行 Shell 命令。
- **CRD 管理**：可自动发现并管理 CRD 资源，提高工作效率。
- **智能翻译与问诊**：基于ChatGPT实现YAML属性自动翻译、Describe信息解读、日志AI问诊、运行命令推荐等，为管理k8s提供智能化支持。
- **跨平台支持**：兼容 Linux、macOS 和 Windows，并支持 x86、ARM 等多种架构，确保多平台无缝运行。

**k8m** 的设计理念是“AI驱动，轻便高效，化繁为简”，它帮助开发者和运维人员快速上手，轻松管理 Kubernetes 集群。

## **运行**
1. **下载**：从 [GitHub](https://github.com/weibaohui/k8m) 下载最新版本。
2. **运行**：使用 `./k8m` 命令启动,访问[http://127.0.0.1:3618](http://127.0.0.1:3618)。
3. **参数**：
```shell
  ./k8m -h
      --add_dir_header                   If true, adds the file directory to the header of the log messages
      --alsologtostderr                  log to standard error as well as files (no effect when -logtostderr=true)
  -k, --chatgpt-key string               API Key for ChatGPT (default "sk-XXXX")
  -u, --chatgpt-url string               API URL for ChatGPT (default "https://api.siliconflow.cn/v1")
  -d, --debug                            Debug mode,same as GIN_MODE
  -c, --kubeconfig string                Absolute path to the kubeConfig file (default "/Users/xxx/.kube/config")
      --log_backtrace_at traceLocation   when logging hits line file:N, emit a stack trace (default :0)
      --log_dir string                   If non-empty, write log files in this directory (no effect when -logtostderr=true)
      --log_file string                  If non-empty, use this log file (no effect when -logtostderr=true)
      --log_file_max_size uint           Defines the maximum size a log file can grow to (no effect when -logtostderr=true). Unit is megabytes. If the value is 0, the maximum file size is unlimited. (default 1800)
      --logtostderr                      log to standard error instead of files (default true)
      --one_output                       If true, only write logs to their native severity level (vs also writing to each lower severity level; no effect when -logtostderr=true)
  -p, --port int                         Port for the server to listen on (default 3618)
      --skip_headers                     If true, avoid header prefixes in the log messages
      --skip_log_headers                 If true, avoid headers when opening log files (no effect when -logtostderr=true)
      --stderrthreshold severity         logs at or above this threshold go to stderr when writing to files and stderr (no effect when -logtostderr=true or -alsologtostderr=true) (default 2)
  -v, --v Level                          number for the log level verbosity (default 0)
      --vmodule moduleSpec               comma-separated list of pattern=N settings for file-filtered logging
```

## **ChatGPT 配置指南**

### 内置GPT
从v0.0.8版本开始，将内置GPT，无需配置。
如果您需要使用自己的GPT，请参考以下步骤。
### **环境变量配置**
需要设置环境变量，以启用ChatGPT。
```bash
export OPENAI_API_KEY="sk-XXXXX"
export OPENAI_API_URL="https://api.siliconflow.cn/v1"
```
### **ChatGPT 状态调试**
如果设置参数后，依然没有效果，请尝试使用`./k8m -v 6`获取更多的调试信息。
会输出以下信息，通过查看日志，确认是否启用ChatGPT。
```go
ChatGPT 开启状态:true
ChatGPT 启用 key:sk-hl**********************************************,url:https://api.siliconflow.cn/v1
```
### **ChatGPT 账户**
本项目集成了[github.com/sashabaranov/go-openai](https://github.com/sashabaranov/go-openai)SDK。
国内访问推荐使用[硅基流动](https://cloud.siliconflow.cn/)的服务。 登录后，在[https://cloud.siliconflow.cn/account/ak](https://cloud.siliconflow.cn/account/ak)创建API_KEY




## 容器化k8s集群方式运行

使用[KinD](https://kind.sigs.k8s.io/docs/user/quick-start/)、[MiniKube](https://minikube.sigs.k8s.io/docs/start/)
安装一个小型k8s集群

## KinD方式

* 创建 KinD Kubernetes 集群

```
brew install kind
```

* 创建新的 Kubernetes 集群：

```
kind create cluster --name k8sgpt-demo
```

# 将k8m部署到集群中体验

## 安装脚本

```docker
kubectl apply -f https://raw.githubusercontent.com/weibaohui/k8m/refs/heads/main/deploy/k8m.yaml
```

* 访问：
  默认使用了nodePort开放，请访问31999端口。或自行配置Ingress
  http://NodePortIP:31999 




## **Makefile 使用指南**

本项目中的 **Makefile** 用于自动化常见任务，如构建、测试和清理项目。以下是详细的使用说明，帮助你了解如何使用 Makefile 中定义的各个目标。

### **先决条件**

在使用 Makefile 之前，请确保你的系统上已安装以下工具：

- **Go（Golang）** - [下载并安装 Go](https://golang.org/dl/)
- **Make** - 通常预装在 Linux 和 macOS 系统中。对于 Windows 用户，可以考虑使用 [GNU Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm) 或 [WSL（Windows Subsystem for Linux）](https://docs.microsoft.com/zh-cn/windows/wsl/install)
- **Git** - 用于获取当前提交哈希

### **可用目标**

#### 1. **make**
- **描述**：默认目标，构建当前平台的可执行文件。
- **使用方法**：
  ```bash
  make
  ```
#### 2. **build**
- **描述**：根据当前系统的操作系统和架构，为当前平台构建可执行文件。
- **使用方法**：
```bash
make build
```

#### 3. **build-all**
- **描述**：为所有指定的平台和架构进行交叉编译，生成相应的可执行文件。
- **使用方法**：
  ```bash
  make build-all
  ```
- **输出**：不同平台的可执行文件将位于 `bin/` 目录中，命名格式为 `k8m-<GOOS>-<GOARCH>`（例如 `k8m-linux-amd64`、`k8m-windows-amd64.exe`）。

#### 4. **clean**
- **描述**：删除 `bin/` 目录及其中的所有编译生成的可执行文件。
- **使用方法**：
  ```bash
  make clean
  ```
- **输出**：`bin/` 目录及其内容将被删除。

#### 5. **run**
- **描述**：构建并运行当前平台的可执行文件。**注意**：此目标仅适用于 Unix 系统（Linux 和 macOS）。
- **使用方法**：
  ```bash
  make run
  ```
- **输出**：应用程序将在本地启动运行。

#### 6. **help**
- **描述**：显示所有可用的 Makefile 目标及其简要描述。
- **使用方法**：
  ```bash
  make help
  ```

### **跨平台编译支持**

**build-all** 目标支持以下操作系统和架构组合的交叉编译：

- **Linux**:
  - `amd64`
  - `arm64`
  - `ppc64le`
  - `s390x`
  - `mips64le`
  - `riscv64`
- **Darwin（macOS）**:
  - `amd64`
  - `arm64`
- **Windows**:
  - `amd64`
  - `arm64`

### **使用示例**

#### **1. 为当前平台构建**

构建适用于当前操作系统和架构的 `k8m` 可执行文件：
```bash
make build
```

#### **2. 为所有支持的平台构建**

交叉编译 `k8m` 为所有指定的平台和架构：
```bash
make build-all
```

#### **3. 运行可执行文件**

在 Unix 系统上构建并运行 `k8m`：
```bash
make run
```

#### **4. 清理构建产物**

删除所有编译生成的可执行文件和 `bin/` 目录：
```bash
make clean
```

#### **5. 查看帮助信息**

显示所有可用的 Makefile 目标及其描述：
```bash
make help
```

### **附加说明**

- **版本控制**：你可以在构建时通过传递 `VERSION` 变量来指定自定义版本：
  ```bash
  make build VERSION=v2.0.0
  ```
- **可执行文件扩展名**：对于 Windows 构建，Makefile 会自动为可执行文件添加 `.exe` 扩展名。
- **依赖性**：确保 Git 已安装并且项目已初始化为 Git 仓库，以便正确获取 `GIT_COMMIT` 哈希值。

### **故障排除**

- **缺少依赖**：如果遇到与缺少命令相关的错误（如 `make`、`go` 等），请确保所有先决条件已安装并正确配置在系统的 `PATH` 中。
- **权限问题**：如果在运行 `make run` 时收到权限被拒绝的错误，请确保 `bin/` 目录和编译后的二进制文件具有必要的执行权限：
  ```bash
  chmod +x bin/k8m
  ```
- **文件浏览权限问题**：依赖容器内的ls命令，请在容器内安装shell、tar、cat等命令 。  

## **运行界面**
### 负载
![workload](images/workload.png)
### Pod内文件编辑
![file-edit](images/file-edit.png)
### 上传文件到Pod内
![upload](images/upload.png)
### Pod内文件下载
![download](images/download.png)
### Tag更新
![tag-update](images/tag-update.png)
### 查看日志
![log-view](images/log-view.png)
### YAML 属性自动翻译
k8m 提供集成的 YAML 浏览、编辑和文档查看功能，支持自动翻译 YAML 属性。无论是查找字段含义还是确认配置细节，您都无需再费时费力地搜索，极大提高了工作效率。  
![yaml-editor](images/yaml.png)
![YAML 属性翻译](images/yaml-ai-1.png)
### Event 信息 AI 问诊
在 Event 页面，k8m 内置了 AI 问诊功能，可智能分析异常事件，并提供详细的解释。点击事件前的“AI大脑”按钮，稍等片刻即可查看诊断结果，快速定位问题原因。  
![异常事件诊断](images/event-3.png)
### 错误日志 AI 问诊
日志分析是定位问题的重要环节，但面对大量报错信息，如何高效排查？k8m 支持 AI 日志诊断，帮助快速识别关键错误并生成解决建议。只需选中相关日志，点击 AI 问诊按钮，即可获得诊断报告。  
![日志诊断](images/log-ai-4.png)
### 运行命令自动生成
日常运维中，Pod 内命令操作不可避免。借助 AI，您只需输入需求描述，k8m 即可自动生成合适的命令供参考，减少查找时间，提高效率。  
![命令自动生成](images/AI-command-3.png)

### HELP & SUPPORT
如果你有任何进一步的问题或需要额外的帮助，请随时与我联系！


## 联系我
微信（大罗马的太阳） 搜索ID：daluomadetaiyang,备注k8m。