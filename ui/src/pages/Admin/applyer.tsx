import { useState, useEffect, useMemo } from 'react';
import { Tabs, Button, Tooltip, List, Input, Modal } from '@arco-design/web-react';
import { IconEye, IconStar, IconDelete } from '@arco-design/web-react/icon';
import axios from 'axios';

const HistoryRecords = () => {
    // 初始化历史记录和收藏记录
    const [allRecords, setAllRecords] = useState<string[]>([]);
    const [favoriteRecords, setFavoriteRecords] = useState<string[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<string>('');
    const [viewRecord, setViewRecord] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 从 localStorage 获取历史记录和收藏记录
    useEffect(() => {
        const all = localStorage.getItem('allRecords');
        const favorites = localStorage.getItem('favoriteRecords');
        setAllRecords(all ? JSON.parse(all) : []);
        setFavoriteRecords(favorites ? JSON.parse(favorites) : []);
    }, []);

    // 更新 localStorage 中的数据
    const updateLocalStorage = useMemo(() => {
        return () => {
            localStorage.setItem('allRecords', JSON.stringify(allRecords));
            localStorage.setItem('favoriteRecords', JSON.stringify(favoriteRecords));
        };
    }, [allRecords, favoriteRecords]);

    // 收藏某条记录
    const toggleFavorite = (record: string) => {
        const updatedFavoriteRecords = [...favoriteRecords];
        const index = updatedFavoriteRecords.findIndex(item => item === record);

        if (index !== -1) {
            // 如果已经在收藏中，移除收藏
            updatedFavoriteRecords.splice(index, 1);
        } else {
            // 否则添加到收藏
            updatedFavoriteRecords.push(record);
        }

        setFavoriteRecords(updatedFavoriteRecords);
        updateLocalStorage();
    };

    // 发送记录的API请求并保存到 localStorage
    const handleSave = () => {
        if (!selectedRecord) return;

        // 检查记录是否已存在
        const existingIndex = allRecords.findIndex(record => record === selectedRecord);
        if (existingIndex !== -1) {
            // 如果记录已存在，为对应元素添加闪亮动画
            const element = document.querySelector(`[data-record-index="${existingIndex}"]`);
            if (element) {
                element.classList.add('highlight-animation');
                // 动画结束后移除类名
                setTimeout(() => {
                    element.classList.remove('highlight-animation');
                }, 1000);
            }
            return;
        }

        // 如果记录不存在，则添加到历史记录中
        const updatedAllRecords = [...allRecords, selectedRecord];
        setAllRecords(updatedAllRecords);
        updateLocalStorage();
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* 左侧历史记录部分 */}
            <div style={{ width: '250px', padding: '10px' }}>
                <style>
                    {`
                    .highlight-animation {
                        animation: highlight 1s ease;
                    }
                    @keyframes highlight {
                        0% { box-shadow: inset 0 0 10px rgba(24, 144, 255, 0.7); }
                        50% { box-shadow: inset 0 0 20px rgba(24, 144, 255, 0.9); }
                        100% { box-shadow: inset 0 0 10px rgba(24, 144, 255, 0.7); }
                    }
                    `}
                </style>
                <Tabs defaultActiveTab="all">
                    <Tabs.TabPane title="所有历史记录" key="all">
                        <List
                            dataSource={allRecords}
                            render={(record, index) => (
                                <List.Item key={index} data-record-index={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
                                        <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                                            {record}
                                        </span>
                                        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, padding: '0 5px' }}>
                                            <Button.Group>
                                                <Button
                                                    type="text"
                                                    icon={<IconEye />}
                                                    onClick={() => {
                                                        setViewRecord(record);
                                                        setIsModalVisible(true);
                                                    }}
                                                />
                                                <Button
                                                    type="text"
                                                    icon={<IconStar />}
                                                    onClick={() => toggleFavorite(record)}
                                                />
                                                <Button
                                                    type="text"
                                                    icon={<IconDelete />}
                                                    onClick={() => {
                                                        const updatedAllRecords = allRecords.filter(item => item !== record);
                                                        setAllRecords(updatedAllRecords);
                                                        if (favoriteRecords.includes(record)) {
                                                            const updatedFavoriteRecords = favoriteRecords.filter(item => item !== record);
                                                            setFavoriteRecords(updatedFavoriteRecords);
                                                        }
                                                        updateLocalStorage();
                                                    }}
                                                />
                                            </Button.Group>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane title="收藏的历史记录" key="favorites">
                        <List
                            dataSource={favoriteRecords}
                            render={(record, index) => (
                                <List.Item key={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span>{record}</span>
                                        <Button
                                            type="text"
                                            icon={<IconEye />}
                                            onClick={() => {
                                                setViewRecord(record);
                                                setIsModalVisible(true);
                                            }}
                                        />
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>

            {/* 右侧编辑区域 */}
            <div style={{ flex: 1, padding: '10px' }}>
                <Input.TextArea
                    value={selectedRecord}
                    onChange={(value) => setSelectedRecord(value)}
                    rows={10}
                />
                <Button
                    type="primary"
                    style={{ marginTop: '10px' }}
                    onClick={handleSave}
                >
                    应用
                </Button>
            </div>

            {/* 查看记录的弹窗 */}
            <Modal
                title="查看记录"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                style={{ width: '600px' }}
            >
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        {viewRecord}
                    </pre>
                </div>
            </Modal>
        </div>
    );
};

export default HistoryRecords;