
export interface Pod {
	metadata: Metadata;
	spec: Spec;
}

export interface Metadata {
	name: string;
	namespace: string;
}

export interface Spec {
	containers: Container[];
}

export interface Container {
	name: string;
	image: string;
	command: string[];
	args: string[];
}
